import { Box } from "@mui/material"

const Login = () => {
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
		</Box>
	)
}

export default Login
