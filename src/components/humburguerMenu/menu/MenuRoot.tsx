import { ComponentProps, useEffect } from "react";

interface props extends ComponentProps<'div'> {
    isOpen: boolean
}

export function MenuRoot({ isOpen, ...props }: props) {
    return (
        <div
            {...props}
            className={`flex items-start justify-between p-10 bg-white top-0 left-0 fixed w-full h-full data-[active=false]:hidden ${props.className}`}
            data-active={isOpen}
        />
    )
}