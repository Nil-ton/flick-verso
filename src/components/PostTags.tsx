'use client'
import { ISessions } from "@/app/type";
import { useRouter } from "next/navigation";

type props = {
    tags: (ISessions | undefined)[]
}
const PostTags = ({ tags = [] }: props) => {
    const router = useRouter()
    return (
        <div className="flex flex-wrap mt-2">
            {tags?.map((tag) => (
                <span
                    key={tag?.slug}
                    onClick={() => router.push(`${tag?.slug}`)}
                    className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                    {tag?.title}
                </span>
            ))}
        </div>
    );
};

export default PostTags;



