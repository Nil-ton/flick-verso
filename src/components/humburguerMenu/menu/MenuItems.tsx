import { ComponentProps } from "react";

interface props extends ComponentProps<'ul'> { }
export function MenuItems(props: props) {
    return <ul {...props} className={`flex flex-col gap-5 uppercase ${props.className}`}>
        
    </ul>
}