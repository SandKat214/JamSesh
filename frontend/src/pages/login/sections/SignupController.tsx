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
import { useFormik } from "formik"
import * as Yup from "yup"
import YupPassword from "yup-password"

YupPassword(Yup)

// Components
import AccountCredentialsForm from "../forms/AccountCredentialsForm"
import PersonalDetailsForm from "../forms/PersonalDetailsForm"
import ProfileDetailsForm from "../forms/ProfileDetailsForm"
import AuditoryPreferencesForm from "../forms/AuditoryPreferencesForm"
import ConfirmAlert from "../../../components/alerts/ConfirmAlert"

interface SignupControllerProps {
	open: boolean
	setOpen: (value: boolean) => void
}

export interface SignupFormValues {
	email: string
	password: string
	confirmPassword: string
	name: string
	city: string
	state: string
	bio: string
	profile_pic: File | undefined
	instruments: {
		instrument: string
		skillLevel: number
	}[]
	genres: string[]
}

// Sign up button
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

// Controller launches the dialog
const SignupController = ({ open, setOpen }: SignupControllerProps) => {
	// track component state
	const [activeStep, setActiveStep] = useState(0) // Stepper control state
	const [openConfirm, setOpenConfirm] = useState(false) // ConfirmAlert control state

	// form validation
	const formik = useFormik<SignupFormValues>({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
			city: "",
			state: "",
			bio: "",
			profile_pic: undefined,
			instruments: [
				{
					instrument: "",
					skillLevel: 1,
				},
			],
			genres: [""],
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is Required"),
			password: Yup.string().password().required("Password is Required"),
			confirmPassword: Yup.string()
				.oneOf(
					[Yup.ref("password"), undefined],
					"Passwords don't match"
				)
				.required("Confirm Password is Required"),
			name: Yup.string().required("Name is Required"),
			city: Yup.string().required("City is Required"),
			state: Yup.string().required("State is Required"),
			bio: Yup.string()
				.max(200, "No more than 200 characters")
				.required("Bio is Required"),
			instruments: Yup.array()
				.of(
					Yup.object({
						instrument: Yup.string().required(
							"Instrument is Required"
						),
						skillLevel: Yup.number().required(
							"Skill level is Required"
						),
					})
				)
				.required("Instruments are Required"),
			genres: Yup.array()
				.of(Yup.string().required("Genre is Required"))
				.required("Genres are Required"),
			profile_pic: Yup.mixed(),
		}),
		onSubmit: (values) => {
			handleContinue()
			console.log(values)
			setOpen(false)
		},
	})

	// Move stepper back and forth
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}
	const handleContinue = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	// Reset form and close
	const handleResetAndClose = () => {
		formik.resetForm()
		setActiveStep(0)

		// Remove focus of active
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
		setOpen(false)
	}

	return (
		<Stack>
			<ControllerButton
				onClick={() => {
					// Fixes assitive reader autofocus warning
					if (document.activeElement instanceof HTMLElement) {
						document.activeElement.blur()
					}
					setOpen(true)
				}}
			/>
			<Dialog
				open={open}
				onClose={() => {
					if (formik.dirty) {
						setOpenConfirm(true)
					} else {
						handleResetAndClose()
					}
				}}
			>
				<DialogTitle>Create an account</DialogTitle>
				<DialogContent>
					{/* Stepper Component */}
					<Stepper
						activeStep={activeStep}
						orientation='vertical'
						sx={{ maxWidth: "400px" }}
					>
						<Step>
							<StepLabel>Account Credentials</StepLabel>
							<StepContent>
								{/* Account Credentials Form */}
								<AccountCredentialsForm
									formik={formik}
									handleSubmit={handleContinue}
								/>
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Personal Details</StepLabel>
							<StepContent>
								{/* Personal Details Form */}
								<PersonalDetailsForm
									formik={formik}
									handleBack={handleBack}
									handleSubmit={handleContinue}
								/>
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Profile Details</StepLabel>
							<StepContent>
								{/* Profile Details Form */}
								<ProfileDetailsForm
									formik={formik}
									handleBack={handleBack}
									handleSubmit={handleContinue}
								/>
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Auditory Preferences</StepLabel>
							<StepContent>
								{/* Auditory Preferences Form */}
								<AuditoryPreferencesForm
									formik={formik}
									handleBack={handleBack}
								/>
							</StepContent>
						</Step>
					</Stepper>
				</DialogContent>
			</Dialog>

			{/* Confirm quit if user exits before finishing */}
			<ConfirmAlert
				handleConfirm={handleResetAndClose}
				message='Are you sure you want to quit without signing up?'
				open={openConfirm}
				setOpen={setOpenConfirm}
				title='You have unsaved changes.'
			/>
		</Stack>
	)
}

export default SignupController
