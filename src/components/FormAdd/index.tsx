'use client'

import { RichTextEditor } from "@/components/RichText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Select from "react-select";
import { customStyles } from "@/utils/selectStyle";
import { Timestamp, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify'
import { usePathname, useRouter } from "next/navigation";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";
import { IPosts } from "@/app/type";
import { fetchNoteData } from "@/hooks/fetchNoteData";
import { fetchData } from "@/hooks/fetchData";
import { auth } from "@/service/firebase";

const selectOption = z.object({
    value: z.string(),
    label: z.string()
})
const noteOption = z.object({
    value: z.number(),
    label: z.number()
})

const schema = z.object({
    title: z.string().max(100, 'No máximo 100 caracteres').nonempty({ message: 'O campo Título é obrigatório' }),
    subtitle: z.string().max(150, 'No máximo 150 caracteres').nonempty({ message: 'O campo Subtítulo é obrigatório' }),
    thumbnail: z.string().nonempty({ message: 'O campo Subtítulo é obrigatório' }),
    description: z.string().nonempty({ message: 'O campo Descrição é obrigatório' }),
    keywords: z.string().nonempty({ message: 'O campo Palavras-chave é obrigatório' }).transform((data) => data.split(',').map((item) => item.toLowerCase().trim())),
    sessions: z.array(selectOption).transform((data) => data.map((item) => item.value)),
    type: selectOption.transform((data) => data.value),
    note: noteOption.optional().transform((data) => data?.value),
    richText: z.string(),
}).refine((value) => {
    const typeValue = value.type;
    return typeValue !== 'review' || (typeValue === 'review' && value.note !== undefined);
}, {
    message: 'O campo Nota é obrigatório para o tipo "review"',
    path: ['note'],
})


type FormSchema = z.infer<typeof schema>

interface props {
    typeOp: any
    sessionsOp: any
}


export function FormAdd({ typeOp, sessionsOp }: props) {
    const { register, handleSubmit, formState: { errors }, control, watch, resetField, unregister, setValue, getValues } = useForm<FormSchema>({
        resolver: zodResolver(schema),
    });

    const noteOp = Array.from({ length: 5 }, (_, index) => ({ value: index + 1, label: index + 1 }));
    const router = useRouter()
    const [isSubmit, setIsSubmit] = useState(false)

    // @ts-expect-error
    const needNote = watch('type')?.value === 'review'
    // @ts-expect-error
    const watchType = watch('type')?.value

    const updateCache = async (session: string, keyword: string) => {
        await fetch(`${process.env.NEXT_PUBLIC_API}/update_cache/posts?sessions=${session}&keywords=${keyword}`);
    };


    const onSubmit = async (data: FormSchema) => {
        setIsSubmit(true)
        try {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('@token')
                const author = await fetchData<any>('admins', { byId: auth.currentUser?.uid, token: token })
                const value = { value: author?.name, label: author?.name, socialMedia: author?.socialMedia }
                const dataDTO = { author: value, ...data }
                await fetch(`${process.env.NEXT_PUBLIC_API}/create/posts`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataDTO),
                })
                data.sessions.forEach((session, i) => updateCache(session, data.keywords[i]));
                data.keywords.forEach((keyword, i) => updateCache(data.sessions[i], keyword));
                toast.success('Editado com sucesso.')
            }

            await fetch(`/api/revalidate?path=/`)
            router.push('/postagens')
        } catch (error: any) {
            toast.error(error.message)
        }
        setIsSubmit(false)
    };

    useEffect(() => {
        if (watchType !== 'review') {
            unregister('note')
        }
    }, [watchType])


    return (
        <form className="flex gap-5" onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
            <div className="w-full">

            </div>
            <div className="shrink-0 w-[70%]">
                <div className="mb-4">
                    <label htmlFor="titulo" className="block mb-1 font-semibold">Título:</label>
                    <input {...register('title')} type="text" id="titulo" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors.title && <p className="text-red-500 mt-1">{errors?.title.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="subtitulo" className="block mb-1 font-semibold">Subtítulo:</label>
                    <input {...register('subtitle')} type="text" id="subtitulo" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors.subtitle && <p className="text-red-500 mt-1">{errors?.subtitle.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block mb-1 font-semibold">Thumbnail:</label>
                    <input {...register('thumbnail')} type="text" id="thumbnail" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors.thumbnail && <p className="text-red-500 mt-1">{errors?.thumbnail.message}</p>}
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
                    {errors.richText && <p className="text-red-500 mt-1">{errors?.richText.message}</p>}
                </>
                }
                />
            </div>

            <div className="shrink-0 w-[25%]">
                <div className="mb-4">
                    <label htmlFor="descricao" className="block mb-1 font-semibold">Descrição:</label>
                    <textarea {...register('description')} id="descricao" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors.description && <p className="text-red-500 mt-1">{errors?.description.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="palavrasChave" className="block mb-1 font-semibold">Palavras-chave:</label>
                    <input {...register('keywords')} type="text" id="palavrasChave" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                    {errors.keywords && <p className="text-red-500 mt-1">{errors?.keywords.message}</p>}
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
                                    value={field.value}
                                    options={sessionsOp}
                                    id="sessoes"
                                    isMulti
                                    styles={customStyles}
                                />
                                {errors.sessions && <p className="text-red-500 mt-1">{errors?.sessions.message}</p>}
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
                                    value={field.value}
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

                {isSubmit && <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md">Enviando...</button>}

                {!isSubmit && <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">Enviar</button>}
            </div>
        </form>
    )
}