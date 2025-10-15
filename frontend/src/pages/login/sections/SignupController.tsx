import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
} from "@mui/material"
import { useState } from "react"

// Components
import AccountCredentials from "../forms/AccountCredentials"
import PersonalDetails from "../forms/PersonalDetails"

interface SignupControllerProps {
	open: boolean
	setOpen: (value: boolean) => void
}

const SignupStepper = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
	const [activeStep, setActiveStep] = useState(0)

	const steps = [
		{
			label: "Account Credentials",
			form: AccountCredentials,
		},
		{
			label: "Personal Details",
			form: PersonalDetails,
		},
		{
			label: "Profile Details",
			form: PersonalDetails,
		},
		{
			label: "Auditory Preferences",
			form: PersonalDetails,
		},
	]

	const handleContinue = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)

		if (activeStep === steps.length - 1) {
			handleSubmit()
		}
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleSubmit = () => {
		// Handle final submission logic here
		console.log("Form submitted")

		// Close the dialog after submission
		setOpen(false)
	}

	return (
		<Stepper activeStep={activeStep} orientation='vertical'>
			{steps.map((step, index) => (
				<Step key={index}>
					<StepLabel>{step.label}</StepLabel>
					<StepContent>
						<step.form
							handleBack={handleBack}
							handleSubmit={handleContinue}
						/>
					</StepContent>
				</Step>
			))}
		</Stepper>
	)
}

const ControllerButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button
			sx={{
				color: "jamRed.main",
				textTransform: "none",
				fontWeight: 600,
				p: 0,
				"&:hover": { textDecoration: "underline", bgcolor: "inherit" },
			}}
			onClick={onClick}
		>
			Sign up
		</Button>
	)
}

const SignupController = ({ open, setOpen }: SignupControllerProps) => {
	return (
		<Stack>
			<ControllerButton onClick={() => setOpen(true)} />
			<Dialog
				slotProps={{
					paper: {
						sx: {
							bgcolor: "white.dark",
							borderRadius: "25px",
							px: "10px",
                            pb: "20px",
						},
					},
				}}
				open={true}
				onClose={() => setOpen(false)}
			>
				<DialogTitle sx={{ fontSize: "25px", fontWeight: 600 }}>
					Create an account
				</DialogTitle>
				<DialogContent>
					<SignupStepper setOpen={setOpen} />
				</DialogContent>
			</Dialog>
		</Stack>
	)
}

export default SignupController
