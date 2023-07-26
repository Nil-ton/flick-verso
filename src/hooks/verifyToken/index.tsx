const url = process.env.NEXT_PUBLIC_API
export async function verifyToken(token: string) {
    try {
        const res = await fetch(`${url}/login`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'POST'
        })
        return await res.json()
    } catch (error) {
        return error
    }
}