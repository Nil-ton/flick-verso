'use client'
import Link from "next/link";
import { IPosts } from "@/app/type"
import React, { useState, useEffect } from 'react';
import { redirect, useRouter } from "next/navigation";
import Pagination from "./Pagination";

type props = {
    posts: IPosts[] | undefined
    search?: string
    currentPage: number
}

export function TablePostagens({ posts, search, currentPage }: props) {
    const [searchResults, setSearchResults] = useState(posts);
    const [inputSearch, setInputSearch] = useState(search)
    const router = useRouter()

    const handleSearch = async () => {
        if (inputSearch === "") {
            return router.push(`/postagens`)
        }
        return router.push(`/postagens/1/${inputSearch}`)
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setInputSearch(e.target.value)
    };

    const handlePageChange = (page: number) => {
        if (search) {
            return router.push(`/postagens/${page}/${search}`)
        }
        router.push(`/postagens/${page}`)
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-5">
                <Pagination currentPage={currentPage || 0} onPageChange={handlePageChange} dataLenght={posts?.length} />
            </div>
        </>
    )
}