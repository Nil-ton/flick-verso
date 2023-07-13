import { Card } from "@/components/Card";
import { LastNews } from "@/components/LastNews";
import { getData } from "@/hooks/getData";
import { IPosts } from "../type";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  return redirect('/home')
}