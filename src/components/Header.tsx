
import { HamburgerMenu } from "./HamburgerMenu ";
import { useRouter } from "next/navigation";
import { getData } from "@/hooks/getData";
import Link from "next/link";
import { FaInstagram, FaSearch, FaTwitter } from "react-icons/fa";
import { ISessions } from "@/app/type";
import { Search } from "./Search";

type props = {
    preview?: boolean
}

export async function Header({ preview }: props) {
    const data = await getData<ISessions[]>('sessions')

    return (
        <header className="p-5 w-full relative z-[10] flex items-center justify-between">

            <HamburgerMenu menu={data} preview={preview} />



            <div className="flex justify-center font-bold text-2xl uppercase">
                <Link href={preview ? '/preview' : '/'} aria-label="Pagina inicial">
                    Flick <span className="text-[red]">Verso™</span>
                </Link>
            </div>

            <div className="lg:block hidden">
                <ul className="flex gap-5 text-[18px] font-semibold">
                    {data?.map((item) => (
                        <li key={item.title} className="hover:underline hover:text-gray-500">
                            <Link href={preview ? '/preview' + item?.slug : item?.slug}>{item?.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-3 text-[21px]">
                <Search />
                <a href="https://www.instagram.com/flickversooficial/" target="_blank"><FaInstagram /></a>
                <a href="https://twitter.com/flickverso" target="_blank"><FaTwitter /></a>
            </div>
        </header>
    )
}