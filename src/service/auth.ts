import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"

export function isAuth() {
    onAuthStateChanged(auth, (user) => {
        if (user && typeof window !== "undefined") {
            return window.localStorage.setItem('@token', user.uid)
        }
        return window.localStorage.removeItem('@token')
    })
}