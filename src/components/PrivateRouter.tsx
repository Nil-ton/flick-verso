'use client'

import { useRouter } from "next/navigation"
import { ReactNode, useCallback, useEffect } from "react"

type props = {
    children: ReactNode
}

export function PrivateRouter({ children }: props) {
    const router = useRouter()
    const token = typeof window !== "undefined" ? window.localStorage.getItem('@token') : null

    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [router, token])

    if (token) {
        return children
    }

    return null
}