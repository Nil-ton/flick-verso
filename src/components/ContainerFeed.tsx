'use client'
import React, { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { IPosts } from "@/app/type";

type props = {
    posts1: IPosts[]
}

export function Container({ posts1 }: props) {
    const [showMore, setShowMore] = useState(false);
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [lastPosts, setLastPosts] = useState<IPosts[]>([]);
    const [slicePosts, setSlicePosts] = useState<IPosts[]>([]);


    // Chamada da função para buscar os posts ao montar o componente
    useEffect(() => {
        setPosts(posts1);
        setLastPosts(posts1.slice(0, 3));
        setSlicePosts(posts1.slice(3));
    }, []);

    // Função para mostrar mais posts
    const handleShowMore = () => {
        setShowMore(true);
    };

    return (
        <div className="flex flex-col gap-10">
            <LastNews posts={lastPosts} />

            {slicePosts.map((item) => (
                <Card key={item.uid} post={item} />
            ))}

            {!showMore && slicePosts.length > 0 && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleShowMore}
                >
                    Ver Mais
                </button>
            )}
        </div>
    );
}