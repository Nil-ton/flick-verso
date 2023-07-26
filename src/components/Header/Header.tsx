
import { HamburguerMenu } from "../humburguerMenu/HamburguerMenu ";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaInstagram, FaSearch, FaTwitter } from "react-icons/fa";
import { IFetchSessions, ISessions } from "@/app/type";
import { Search } from "../Search";
import { HeaderRoot } from "./Root";
import { fetchData } from "@/hooks/fetchData";

type props = {
    preview?: boolean
}

export async function Header({ preview }: props) {
    const data = await fetchData<IFetchSessions>('sessions')

    return (
        <HeaderRoot>
            <HamburguerMenu menu={data?.sessions} preview={preview} />

            <div className="flex justify-center font-bold text-2xl uppercase">
                <Link href={preview ? '/preview' : '/'} aria-label="Pagina inicial">
                    Flick <span className="text-[red]">Verso™</span>
                </Link>
            </div>

            <div className="lg:block hidden">
                <ul className="flex gap-5 text-[18px] font-semibold">
                    {data?.sessions?.map((item) => (
                        <li key={item.title} className="font-medium hover:text-zinc-600">
                            <Link href={preview ? '/preview' + item?.slug : item?.slug}>{item?.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-3 text-[21px]">
                <Search />
                <a href="https://www.instagram.com/flickversooficial/" aria-label="Instagram" className="font-medium hover:text-zinc-600" target="_blank"><FaInstagram /></a>
                <a href="https://twitter.com/flickverso" aria-label="Twitter" className="font-medium hover:text-zinc-600" target="_blank"><FaTwitter /></a>
            </div>
        </HeaderRoot>
    )
}