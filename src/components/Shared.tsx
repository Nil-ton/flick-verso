'use client'
import { IPosts } from "@/app/type";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

type props = {
    post: IPosts
}
export function Shered({ post }: props) {
    return (
        <div className="text-[21px] flex gap-3 prose">
            <TwitterShareButton url={`https://flickverso.com.br/${post.uid}`} title={post.title}>
                <FaTwitter />
            </TwitterShareButton>
            <FacebookShareButton url={`https://flickverso.com.br/${post.uid}`} title={post.title}>
                <FaFacebook />
            </FacebookShareButton>
            <WhatsappShareButton url={`https://flickverso.com.br/${post.uid}`} title={post.title}>
                <FaWhatsapp />
            </WhatsappShareButton>
        </div>
    )
}