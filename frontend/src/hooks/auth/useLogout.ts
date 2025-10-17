import { useNavigate } from "react-router"
import { useAuth } from "./useAuth"

export const useLogout = () => {
    const { dispatch } = useAuth()
    const navigate = useNavigate()

    const logout = () => {
        // Clear user from local storage
        localStorage.removeItem("user")

        // Dispatch logout action
        dispatch({ type: "LOGOUT" })

        // Redirect to login page
        navigate("/login")
    }

    return { logout }
}