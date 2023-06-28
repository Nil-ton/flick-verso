'use client'
import { useRouter } from "next/navigation"

export function Footer() {
    const router = useRouter()
    const menu = [
        { slug: '/quem-somos', title: 'Quem Somos' },
        { slug: '/politica-privacidade', title: 'Política de Privacidade' },
    ]
    return (
        <footer className="h-[150px] p-5 lg:flex justify-between m-[0_auto] mt-10">
            <span className="uppercase font-bold text-2xl">
                Flick <span className="text-[red]">Verso™</span>
            </span>
            <div>
                <ul>
                    {menu.map((item) => (
                        <li
                            key={item.title}
                            className="hover:underline cursor-pointer"
                            onClick={() => router.push(`${item.slug}`)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col">
                <span className="uppercase">
                    © - 2023 Flick Verso
                </span>
                <span>
                    Todas as imagens de filmes, séries e etc são marcas registradas dos seus respectivos proprietários.
                </span>
                <span>
                    Powered by - Designed with Nilton Oliveira
                </span>
            </div>
        </footer>
    )
}