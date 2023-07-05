'use client'
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export function Search() {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    const handleOpen = () => setOpen(!open)
    const handleSearchTerm = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value)
    }
    const handleRedirect = () => {
        router.push(`/search/${searchTerm}`)
        setOpen(false)
    }

    return (
        <>
            <div className={`${open ? 'block' : 'hidden'} w-full h-screen fixed top-0 left-0 scroll-none bg-[rgba(1,1,1,.9)]`}>
                <div className="text-[40px] text-white w-full flex justify-end cursor-pointer p-10" onClick={handleOpen}>
                    <MdOutlineClose />
                </div>
                <div itemScope itemType="https://schema.org/WebSite">
                    <div className="relative m-[10%]" itemScope itemType="https://schema.org/SearchAction">
                        <input
                            type="text"
                            name="q"
                            autoComplete="off"
                            className="pl-4 pr-10 py-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Palavra-chave"
                            required
                            onChange={handleSearchTerm}
                        />
                        <button
                            type="button"
                            className="absolute top-0 right-0 h-full w-12 bg-blue-500 text-white rounded-r-lg flex items-center justify-center"
                            onClick={handleRedirect}
                        >
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>
            <div dir="rtl">
                <div className="border-s-2 border-gray-300 cursor-pointer">
                    <div className="pr-2" onClick={handleOpen}>
                        <FaSearch />
                    </div>
                </div>
            </div>
        </>
    )
}