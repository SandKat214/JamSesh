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
	Typography,
} from "@mui/material"
import { useState } from "react"

interface SignupControllerProps {
	open: boolean
	setOpen: (value: boolean) => void
}

const steps = [
	{
		label: "Account Credentials",
		form: "Insert form component here",
	},
	{
		label: "Personal Details",
		form: "Insert form component here",
	},
	{
		label: "Profile Details",
		form: "Insert form component here",
	},
	{
		label: "Auditory Preferences",
		form: "Insert form component here",
	},
]

const SignupStepper = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
	const [activeStep, setActiveStep] = useState(0)

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
		<form>
			<Stepper activeStep={activeStep} orientation='vertical'>
				{steps.map((step, index) => (
					<Step key={index}>
						<StepLabel>{step.label}</StepLabel>
						<StepContent>
							<Typography>{step.form}</Typography>
							<Stack direction='row' spacing={1} sx={{ mt: 2 }}>
								<Button
									variant='containedNeutral'
									disabled={index === 0}
									onClick={handleBack}
								>
									Back
								</Button>
								<Button
									variant='containedPurple'
									onClick={handleContinue}
								>
									{index === steps.length - 1
										? "Finish"
										: "Continue"}
								</Button>
							</Stack>
						</StepContent>
					</Step>
				))}
			</Stepper>
		</form>
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
							bgcolor: "white.light",
							borderRadius: "30px",
							px: "10px",
						},
					},
				}}
				open={open}
				onClose={() => setOpen(false)}
			>
				<DialogTitle sx={{ fontSize: "25px" }}>
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
