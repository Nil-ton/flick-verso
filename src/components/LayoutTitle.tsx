'use client'
import { usePathname, useRouter } from 'next/navigation'
export function LayoutTitle() {
    const pathname = usePathname()
    const router = useRouter()

    const title = pathname.split('/')[1]
    return <h1 className="font-bold text-[24px] mb-10 uppercase cursor-pointer" onClick={() => router.push('/postagens')}>{title}</h1>
}