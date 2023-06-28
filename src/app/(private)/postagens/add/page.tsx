'use client'

import { RichTextEditor } from "@/components/RichText";
import { getData } from "@/hooks/getData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Select from "react-select";
import { customStyles } from "@/utils/selectStyle";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/service/firebase";
import { toast } from 'react-toastify'
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";
import { useRouter } from "next/navigation";
import { getDocData } from "@/hooks/getDoc";

const selectOption = z.object({
    value: z.string(),
    label: z.string()
})
const noteOption = z.object({
    value: z.number(),
    label: z.number()
})
const authorOption = z.object({
    value: z.string(),
    label: z.string(),
    socialMedia: z.string()
})

const schema = z.object({
    title: z.string().max(90, 'No máximo 60 caracteres').nonempty({ message: 'O campo Título é obrigatório' }),
    subtitle: z.string().max(150, 'No máximo 100 caracteres').nonempty({ message: 'O campo Subtítulo é obrigatório' }),
    thumbnail: z.string().nonempty({ message: 'O campo Subtítulo é obrigatório' }),
    description: z.string().nonempty({ message: 'O campo Descrição é obrigatório' }),
    keywords: z.string().nonempty({ message: 'O campo Palavras-chave é obrigatório' }),
    sessions: z.array(selectOption),
    type: selectOption,
    author: authorOption,
    note: noteOption.optional(),
    richText: z.string()
}).refine((value) => {
    const typeValue = value.type?.value;
    return typeValue !== 'review' || (typeValue === 'review' && value.note !== undefined);
}, {
    message: 'O campo Nota é obrigatório para o tipo "review"',
    path: ['note'],
})


type FormSchema = z.infer<typeof schema>

export default function Add() {
    const { register, handleSubmit, formState: { errors }, control, watch, resetField, setValue } = useForm<FormSchema>({
        resolver: zodResolver(schema),
    });

    const [sessionsOp, setSessionOp] = useState<any>([])
    const [typeOp, setTypeOp] = useState<any>([])
    const noteOp = Array.from({ length: 5 }, (_, index) => ({ value: index + 1, label: index + 1 }));
    const router = useRouter()

    const needNote = watch('type')?.value !== 'review' ? false : true
    const watchType = watch('type')

    const onSubmit = async (data: FormSchema) => {
        const dataDTO = {
            ...data,
            keywords: data.keywords.split(','),
            sessions: data.sessions.map((item) => item.value),
            type: data.type.value,
            createdAt: Timestamp.now()
        }

        delete dataDTO.note
        const idCollection = replaceSpacesWithHyphens(data.title)
        const docRef = doc(db, 'posts', idCollection as string);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            toast.error('Já existe uma postagem com esse nome.')
            return;
        }

        await setDoc(docRef, dataDTO);

        if (data.note) {
            const subcolecaoRef = doc(db, "posts", `${idCollection}/nota/${auth.currentUser?.uid}`);
            await setDoc(subcolecaoRef, { note: data.note?.value });
        }
        data.sessions.forEach(async (session) => {
            const res = await (await fetch(`/api/revalidate/${session}`)).json()
            console.log(res)
        })
        router.push('/postagens?page=' + 1)
    };

    useEffect(() => {
        (async () => {
            const sessions = await getData<any>('sessions')
            setSessionOp(sessions?.map((item: any) => (
                {
                    value: item.uid,
                    label: item.title
                }
            )))
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const type = await getData<any>('type_post')
            setTypeOp(type?.map((item: any) => (
                {
                    value: item.uid,
                    label: item.title
                }
            )))
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const author = await getDocData<any>('admins', null, auth.currentUser?.uid)
            delete author?.createdAt
            delete author?.updatedAt
            const value = { value: author.name, label: author.name, socialMedia: author.socialMedia }
            setValue('author', value)
        })()
    }, [])

    useEffect(() => {
        if (watchType?.value !== 'review') {
            resetField('note')
        }
    }, [resetField, watchType?.value])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
            <div className="shrink-0 w-[70%]">
                <div className="mb-4">
                    <label htmlFor="titulo" className="block mb-1 font-semibold">Título:</label>
                    <input {...register('title')} type="text" id="titulo" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors?.title && <p className="text-red-500 mt-1">{errors?.title.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="subtitulo" className="block mb-1 font-semibold">Subtítulo:</label>
                    <input {...register('subtitle')} type="text" id="subtitulo" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors?.subtitle && <p className="text-red-500 mt-1">{errors?.subtitle.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block mb-1 font-semibold">Thumbnail:</label>
                    <input {...register('thumbnail')} type="text" id="thumbnail" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors?.thumbnail && <p className="text-red-500 mt-1">{errors?.thumbnail.message}</p>}
                </div>

                <Controller name="richText" control={control} render={({ field }) => <>
                    <Controller
                        name="richText"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <RichTextEditor value={field.value} onChange={field.onChange} />
                        )}
                    />
                    {errors?.richText && <p className="text-red-500 mt-1">{errors?.richText.message}</p>}
                </>
                }
                />
            </div>

            <div className="shrink-0 w-[25%]">
                <div className="mb-4">
                    <label htmlFor="descricao" className="block mb-1 font-semibold">Descrição:</label>
                    <textarea {...register('description')} id="descricao" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="palavrasChave" className="block mb-1 font-semibold">Palavras-chave:</label>
                    <input {...register('keywords')} type="text" id="palavrasChave" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors.keywords && <p className="text-red-500 mt-1">{errors.keywords.message}</p>}
                </div>

                <Controller
                    control={control}
                    name="sessions"
                    render={({ field }) => (
                        <>
                            <div className="mb-4">
                                <label htmlFor="sessoes" className="block mb-1 font-semibold">Sessões:</label>
                                <Select
                                    onChange={(e: any) => field.onChange(e)}
                                    options={sessionsOp}
                                    id="sessoes"
                                    isMulti
                                    styles={customStyles}
                                />
                                {errors.sessions && <p className="text-red-500 mt-1">{errors.sessions.message}</p>}
                            </div>
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <>
                            <div className="mb-4">
                                <label htmlFor="tipo" className="block mb-1 font-semibold">tipo:</label>
                                <Select
                                    onChange={(e: any) => field.onChange(e)}
                                    options={typeOp}
                                    id="tipo"
                                    styles={customStyles}
                                />
                                {errors.type && <p className="text-red-500 mt-1">{errors.type.message}</p>}
                            </div>

                        </>
                    )}
                />

                {needNote && (
                    <Controller
                        control={control}
                        name="note"
                        render={({ field }) => (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="note" className="block mb-1 font-semibold">Nota:</label>
                                    <Select
                                        onChange={(e: any) => field.onChange(e)}
                                        value={field.value}
                                        options={noteOp}
                                        id="note"
                                        styles={customStyles}
                                    />
                                    <span className="text-[gray]">Requer nota um review.</span>
                                    {errors.note && <p className="text-red-500 mt-1">{errors.note.message}</p>}
                                </div>
                            </>
                        )}
                    />
                )}

                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">Enviar</button>
            </div>

        </form>
    )
}