'use client'
import Link from "next/link";
import { IPosts } from "@/app/type"
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/service/firebase';
import { useRouter, useSearchParams } from "next/navigation";
import { replaceSpacesWithHyphens } from "@/utils/replaceSpacesWithHyphens";

type props = {
    posts: IPosts[] | undefined
}

export function TablePostagens({ posts }: props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const search = searchParams.get('search')
    const page = searchParams.get('page')

    const [searchResults, setSearchResults] = useState(posts);
    const [inputSearch, setInputSearch] = useState('')

    const handleSearch = async () => {
        router.push(`/postagens?page=${page}&search=${inputSearch}`)
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearch(e.target.value)
    };


    useEffect(() => {
        if (!search || search === '') {
            setSearchResults(posts);
        } else {
            (async () => {
                // Executa a consulta no Firestore com base no termo de pesquisa
                const q = query(collection(db, 'posts'), where('title', '==', search));
                const querySnapshot = await getDocs(q);

                // Mapeia os resultados da consulta para um array
                const results: any = []

                querySnapshot.docs.forEach((doc) => {
                    const timestamp = doc.data().createdAt as Timestamp;
                    const date = new Date(timestamp.toDate().toUTCString())
                    const createdAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;;
                    const id = doc.id
                    results.push({ ...doc.data(), uid: id, createdAt })
                });

                // Define os resultados da pesquisa no estado
                setSearchResults(results);
            })()
        }
    }, [posts, search])


    return (
        <>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Digite o termo de pesquisa"
                    onChange={handleSearchChange}
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
                                    href={'postagens/edit/' + item.uid}
                                    className="text-blue-500"
                                >
                                    Editar
                                </Link>
                                <Link
                                    href={`/preview/${item.uid}`}
                                    className="text-blue-500"
                                >
                                    Visualizar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}