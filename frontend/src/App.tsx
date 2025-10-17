import { Box, Typography } from "@mui/material"
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
				element: (
                    // Page background
                    <Box sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "top",
                    paddingTop: "4%",
                    paddingBottom: "0px",
                    alignItems: "center",
                    backgroundImage: "url(/background.png)",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    }}>
                        <img src="/JamSesh_tagline.svg" width="350px" height="135px"></img>

                        {/* Login box, blur effect adapted from https://css.glass */}
                        <Box sx={{
                        width: "600px",
                        height: "620px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "4%",
                        paddingTop: "2em",
                        borderRadius: "4em",
                        background: "rgba(255, 255, 255, 0.58)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(10.1px)",
                        webkitBackdropFilter: "blur(10.1px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}>
                            <Typography color='purple.dark' fontSize='3em'>Welcome Back</Typography>
                        </Box>
                    </Box>
				),
			},
			{
				path: "login",
				Component: Login,
			},
		])
	}, [user])

	return <RouterProvider router={router} />
}
