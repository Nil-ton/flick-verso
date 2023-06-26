import Link from "next/link";

export function Sidebar() {
    return (
        <div className="bg-gray-200 w-64 min-h-screen p-4 shrink-0">
            <span className="uppercase font-bold text-2xl m-5">
                Flick <span className="text-[red]">Verso™</span>
            </span>
            <ul className="space-y-2">
                <li>
                    <Link href={{
                        query: { page: 1 },
                        pathname: '/postagens'
                    }} className="block text-gray-700 hover:bg-gray-300 px-2 py-1 rounded">
                        Postagens
                    </Link>
                </li>
                <li>
                    <a href="#" className="block text-gray-700 hover:bg-gray-300 px-2 py-1 rounded">
                        Usuários
                    </a>
                </li>
                <li>
                    <a href="#" className="block text-gray-700 hover:bg-gray-300 px-2 py-1 rounded">
                        Sessões
                    </a>
                </li>
            </ul>
        </div>
    )
}