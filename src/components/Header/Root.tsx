import { ComponentProps } from "react";

interface props extends ComponentProps<'header'> {

}

export function HeaderRoot(props: props) {
    return (
        <header {...props} className={`p-5 w-full relative z-[10] flex items-center justify-between ${props.className}`} />

    )
}