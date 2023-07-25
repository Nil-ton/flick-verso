import Link from "next/link";

type props = {
    pathname: string
    limit: number
}

export function ViewMoreButton({ limit, pathname }: props) {
    return <Link
        aria-label="Ver Mais"
        className="cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
        href={`/page/${pathname}/${limit}`}
    >
        Ver Mais
    </Link>
}