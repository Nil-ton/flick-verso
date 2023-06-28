
import { HamburgerMenu } from "./HamburgerMenu ";
import { useRouter } from "next/navigation";
import { getData } from "@/hooks/getData";
import Link from "next/link";

export async function Header() {
    const data = await getData('sessions')

    return (
        <header className="p-5 relative z-[10] flex items-center justify-between">

            <HamburgerMenu menu={data} />

            <div className="flex justify-center font-bold text-2xl uppercase">
                <Link href={'/'} aria-label="Pagina inicial">
                    Flick <span className="text-[red]">Verso™</span>
                </Link>
            </div>
            <div></div>
        </header>
    )
}