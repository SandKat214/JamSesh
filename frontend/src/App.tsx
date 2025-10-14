import { Box, Typography } from "@mui/material"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

// pages
import Login from "./pages/Login"

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Box>
				<Typography color='jamRed'>Home Page</Typography>
			</Box>
		),
	},
	{
		path: "login",
		Component: Login,
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
