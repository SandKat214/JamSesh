// Need to add Citation for Net Ninja for this context pattern and corresponding hooks!

import {
	createContext,
	useEffect,
	useReducer,
	type Dispatch,
	type ReactNode,
} from "react"

// Defined shapes; may create a types directory later and move these there
interface AuthContextType {
	user: any | null // TODO: Replace 'any' with a User type later
	dispatch: Dispatch<any>
}

interface AuthProviderProps {
	children: ReactNode
}

type AuthAction = { type: "LOGIN"; payload: any } | { type: "LOGOUT" } // TODO: Replace 'any' with a User type later

// Create the context
const AuthContext = createContext<AuthContextType>({
	user: null,
	dispatch: () => null,
})

const authReducer = (state: { user: any | null }, action: AuthAction) => {
	// TODO: Replace 'any' with a User type later
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload }
		case "LOGOUT":
			return { user: null }
		default:
			return state
	}
}

// AuthProvider component to wrap the app and provide auth state
const AuthProvider = ({ children }: AuthProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, { user: null })

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user") || "null")
		if (user) {
			dispatch({ type: "LOGIN", payload: user })
		}
	}, [])

	console.log("AuthContext state:", state)

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
