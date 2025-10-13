import { Box, Typography } from "@mui/material"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Box>
				<Typography color='jamRed'>Home Page</Typography>
			</Box>
		),
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
