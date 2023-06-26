'use client'
import { usePathname } from 'next/navigation'
export function LayoutTitle() {
    const pathname = usePathname()

    const title = pathname.split('/')[1]
    return <h1 className="font-bold text-[24px] mb-10 uppercase">{title}</h1>
}