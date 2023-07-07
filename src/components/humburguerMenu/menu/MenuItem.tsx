import { ComponentProps } from "react";
import { useRouter } from 'next/navigation'

interface props extends ComponentProps<'li'> { }
export function MenuItem(props: props) {
    const router = useRouter()
    return <li
        {...props}
        className={`font-bold hover:underline cursor-pointer ${props.className}`} />
}