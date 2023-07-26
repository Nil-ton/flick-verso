'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useRef, useState } from "react"
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/service/firebase"
import { verifyToken } from "@/hooks/verifyToken"
import { toast } from "react-toastify"



const loginUseFormSchema = z.object({
    email: z.string().nonempty("O email é obrigatório").email("Formato do email inválido"),
    password: z.string().nonempty("A senha é obrigatório")
})

type ILoginUseFormSchema = z.infer<typeof loginUseFormSchema>

export default function Adm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, setError } = useForm<ILoginUseFormSchema>({ resolver: zodResolver(loginUseFormSchema) })

    const login = async (data: any) => {
        const { email, password } = data
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const token = await user.getIdToken()
                if (token && typeof window !== "undefined") {
                    window.localStorage.setItem('@token', token)
                    const res = await verifyToken(token)
                    console.log(res)
                    toast.loading('Redirecionando...')
                    router.push('/postagens')
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
    }

    const handleTogglePassword = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="min-h-[100vh]">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 shadow-lg rounded-md">
                    <h2 className="text-2xl mb-4">Login</h2>
                    <form onSubmit={handleSubmit(login)}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email:</label>
                            <input type="email" id="email" className="border border-gray-300 px-4 py-2 rounded-md w-full" {...register('email')} placeholder="email" />
                            {errors.email && <span className="block text-[red]">{errors.email.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2">Password:</label>
                            <div>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} id="password" className="border border-gray-300 px-4 py-2 rounded-md w-full pr-[80px]" maxLength={25} {...register('password')} placeholder="passowrd" />
                                    <span onClick={handleTogglePassword} className="absolute right-1 bottom-1 py-1 cursor-pointer bg-white">
                                        {showPassword ? 'Esconder' : 'Visualizar'}
                                    </span>
                                </div>
                                {errors.password && <span className="block text-[red]">{errors.password.message}</span>}
                            </div>

                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Login</button>

                    </form>
                </div>
            </div>
        </div>
    )
}
