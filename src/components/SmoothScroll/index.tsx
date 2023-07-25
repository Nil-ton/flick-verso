'use client'
import { useEffect } from "react"

export function SmoothScroll() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const element = document.getElementById('start')
            if (element) {
                window.scrollTo(0, element.offsetTop - 300)
            }
        }
    }, [])
    return <p id="start" className="m-0 p-0"></p>
}