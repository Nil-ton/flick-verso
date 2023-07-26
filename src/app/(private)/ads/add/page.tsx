'use client'

import { RichTextEditor } from "@/components/RichText";
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
    image: z.string().nonempty({ message: 'O campo Imagem é obrigatório' }),
    affiliatedLink: z.string().nonempty({ message: 'O campo Link Afiliado é obrigatório' }),
    price: z.string().nonempty({ message: 'O campo Preço é obrigatório' }).transform((value) => Number(value.replace(',', '.')))
})


type FormSchema = z.infer<typeof schema>

export default function Add() {
    const { register, handleSubmit, formState: { errors }, control, watch, resetField, setValue, reset } = useForm<FormSchema>({
        resolver: zodResolver(schema),
    });
    const [isSubmit, setIsSubmit] = useState(false)
    const onSubmit = async (data: FormSchema) => {
        setIsSubmit(true)
        try {
            const idCollection = replaceSpacesWithHyphens(data.title)
            const docRef = doc(db, 'ads', idCollection as string);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                toast.error('Já existe uma postagem com esse nome.')

                return setIsSubmit(false)
            }
            await setDoc(docRef, { ...data, createdAt: Timestamp.now() });
            reset()
            // await fetch(`/api/revalidate?path=/`)
        } catch (error) {
            toast.error('Ocorreu um erro no servidor')
        }
        setIsSubmit(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="titulo" className="block mb-1 font-semibold">Título:</label>
                <input {...register('title')} type="text" id="titulo" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                {errors?.title && <p className="text-red-500 mt-1">{errors?.title.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-1 font-semibold">Preço:</label>
                <input {...register('price')} type="text" id="price" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                {errors?.price && <p className="text-red-500 mt-1">{errors?.price.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="affiliatedLink" className="block mb-1 font-semibold">Link Afiliado:</label>
                <input {...register('affiliatedLink')} type="text" id="price" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                {errors?.affiliatedLink && <p className="text-red-500 mt-1">{errors?.affiliatedLink.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block mb-1 font-semibold">Imagem:</label>
                <input {...register('image')} type="text" id="price" className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                {errors?.image && <p className="text-red-500 mt-1">{errors?.image.message}</p>}
            </div>
            <div className="text-end">
                {isSubmit && <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md">Enviando...</button>}

                {!isSubmit && <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">Enviar</button>}
            </div>
        </form >
    )
}