import { auth } from "@/service/firebase"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get('path')
    if (auth.currentUser?.uid) {
        if (!path) {
            return NextResponse.json({ revalidate: false })
        }
        revalidatePath(path)
        return NextResponse.json({ revalidate: true, date: `${new Date().getDay()} - ${new Date().getHours()}` })
    }
}