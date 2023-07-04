
import { HamburgerMenu } from "./HamburgerMenu ";
import { useRouter } from "next/navigation";
import { getData } from "@/hooks/getData";
import Link from "next/link";
import { FaInstagram, FaTwitter } from "react-icons/fa";

type props = {
    preview?: boolean
}

export async function Header({ preview }: props) {
    const data = await getData('sessions')

    return (
        <header className="p-5 w-full relative z-[10] flex items-center justify-between">

            <HamburgerMenu menu={data} preview={preview} />

            <div className="flex justify-center font-bold text-2xl uppercase">
                <Link href={preview ? '/preview' : '/'} aria-label="Pagina inicial">
                    Flick <span className="text-[red]">Verso™</span>
                </Link>
            </div>
            <div className="flex gap-3 text-[21px]">
                <a href="https://www.instagram.com/flickversooficial/" target="_blank"><FaInstagram /></a>
                <a href="https://twitter.com/flickverso" target="_blank"><FaTwitter /></a>
            </div>
        </header>
    )
}