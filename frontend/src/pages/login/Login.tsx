import { Box } from "@mui/material"
import SignupController from "./sections/SignupController"
import { useState } from "react"

const Login = () => {
	const [open, setOpen] = useState(false) // Dialog control state

	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{/* Nest content in this box */}
			Login Page
			<SignupController open={open} setOpen={setOpen} />
		</Box>
	)
}

export default Login
