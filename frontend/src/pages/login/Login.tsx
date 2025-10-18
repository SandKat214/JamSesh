import { Box, Typography } from "@mui/material"
import { useState } from "react"

// Assets
import background from "../../assets/background.png"
import JamSesh_tagline from "../../assets/JamSesh_tagline.svg"

// Components
import SignupController from "./sections/SignupController"
import LoginController from "./sections/LoginController"

const Login = () => {
	const [open, setOpen] = useState(false) // Dialog control state

	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "top",
				paddingTop: "3.5%",
				paddingBottom: "0px",
				alignItems: "center",
				backgroundImage: `url(${background})`,
				backgroundPosition: "bottom",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundAttachment: "fixed",
			}}
		>
			<img src={JamSesh_tagline} width='350px' height='135px' />
			{/* Login box, blur effect adapted from https://css.glass */}
			<Box
				sx={{
					width: "600px",
					height: "620px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: "3.5%",
					paddingTop: "2em",
					borderRadius: "4em",
					background: "rgba(255, 255, 255, 0.58)",
					boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
					backdropFilter: "blur(10.1px)",
					webkitBackdropFilter: "blur(10.1px)",
					border: "1px solid rgba(255, 255, 255, 0.08)",
				}}
			>
				<Typography fontSize='3em'>Welcome Back</Typography>
                {/* Login form: */}
                <LoginController/>
                <Typography fontSize='1em'>Don't have an account?</Typography>
                {/* Account signup form: */}
				<SignupController open={open} setOpen={setOpen}/>
			</Box>
		</Box>
	)
}

export default Login
