import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import { useMemo } from "react"

// hooks
import { useAuth } from "./context/auth/useAuth"

// pages
import Login from "./pages/login/Login"

export default function App() {
	const { user } = useAuth()

	// TODO: Add Navigation to redirect depending on user authentication
	// Consider making a ProtectedRoute component as an alternative to useMemo
	const router = useMemo(() => {
		return createBrowserRouter([
			{
				path: "/",
				element: <></>, // TODO: Build Root Layout and Home Page
			},
			{
				path: "login",
				Component: Login,
			},
		])
	}, [user])

	return <RouterProvider router={router} />
}
