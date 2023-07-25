'use client'
import Link from "next/link";
import { IFetchPosts, IPosts } from "@/app/type"
import React, { useState, useEffect } from 'react';
import { TwitterShareButton } from "react-share";
import { FaLink, FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";
import { isMultipleOfTen } from "@/utils/isMultipleOfTen";
import { fetchData } from "@/hooks/fetchData";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";

type props = {
    posts: IPosts[] | undefined
    search?: string
    currentPage: number
}

export function TablePostagens({ posts, search, currentPage }: props) {
    const [searchResults, setSearchResults] = useState(posts);
    const [inputSearch, setInputSearch] = useState(search)
    const [limit, setLimit] = useState(10)

    const handleSearch = async () => {
        if (inputSearch === "") {
            return setSearchResults(posts)
        }
        const data = await fetchData<IPosts>('posts', { byId: String(replaceSpacesWithHyphens(inputSearch)) })
        setSearchResults([data] as any)
    };

    const handleLimit = async () => {
        const newLimit = limit + 10
        const data = await fetchData<IFetchPosts>('posts', { limit: newLimit })
        setSearchResults(data?.posts as any)
        setLimit(newLimit)
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setInputSearch(e.target.value)
    };

    const handleCopyClick = (value: string) => {
        // Copia o texto para a área de transferência
        navigator.clipboard.writeText(value)
            .then(() => {
                // O texto foi copiado com sucesso
                toast.success('Texto copiado com sucesso!');
            })
            .catch((error) => {
                // Houve um erro ao tentar copiar o texto
                toast.error('Texto copiado com sucesso!');
            });
    };


    useEffect(() => {
        setSearchResults(posts)
        setInputSearch(search || "")
    }, [posts, search])


    return (
        <>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Digite o termo de pesquisa"
                    onChange={handleSearchChange}
                    value={inputSearch}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button onClick={handleSearch} className="text-blue-500 font-bold ml-5">Pesquisar</button>
                <Link href={'/postagens/add'} className="text-blue-500 font-bold ml-5">Adicionar</Link>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults?.map((item) => (
                        <tr key={item.uid}>
                            <td className="border px-4 py-2">{item.title}</td>
                            <td className="border px-4 py-2">{item?.updatedAt || item.createdAt}</td>
                            <td className="border px-4 py-2 flex gap-3">
                                <Link
                                    href={'/postagens/edit/' + item.uid}
                                    className="text-blue-500"
                                >
                                    Editar
                                </Link>
                                <Link
                                    href={`/${item.uid}`}
                                    className="text-blue-500"
                                >
                                    Visualizar
                                </Link>
                                <TwitterShareButton url={`https://flickverso.com.br/${item.uid}`} title={item.title}>
                                    <FaTwitter />
                                </TwitterShareButton>
                                <button onClick={() => handleCopyClick(`https://flickverso.com.br/${item.uid}`)}><FaLink /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-5">
                {isMultipleOfTen(searchResults?.length) && <button
                    aria-label="Ver Mais"
                    className="w-full cursor-pointer inline-block bg-gray-200 rounded-full text-center text-lg px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
                    onClick={handleLimit}
                >
                    Ver Mais
                </button>}
            </div>
        </>
    )
}