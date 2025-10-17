import { AuthContext } from "./AuthContext"
import { useContext } from "react"

export const useAuth = () => {
	const context = useContext(AuthContext)

	// Ensure the hook is used within an AuthProvider wrapper
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}

	return context
}
