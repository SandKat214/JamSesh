import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	OutlinedInput,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material"
import { useState } from "react"

// Icons
import AddCircleIcon from "@mui/icons-material/AddCircle"
import DeleteIcon from "@mui/icons-material/Delete"

// Components
import FormField from "../../../components/forms/FormField"
import SkillSlider from "../../../components/forms/SkillSlider"

interface SignupControllerProps {
	open: boolean
	setOpen: (value: boolean) => void
}

const SignupStepper = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
	const [activeStep, setActiveStep] = useState(0)
	const [instrumentCt, setInstrumentCt] = useState(1)
	const [genreCt, setGenreCt] = useState(1)

	const addGenre = () => {
		setGenreCt((prevCt) => prevCt + 1)
	}

	const addInstrument = () => {
		setInstrumentCt((prevCt) => prevCt + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleContinue = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleSubmit = () => {
		// Handle final submission logic here
		console.log("Form submitted")

		// Close the dialog after submission
		handleContinue()
		setOpen(false)
	}

	const removeGenre = () => {
		setGenreCt((prevCt) => prevCt - 1)
	}

	const removeInstrument = () => {
		setInstrumentCt((prevCt) => prevCt - 1)
	}

	return (
		<Stepper activeStep={activeStep} orientation='vertical'>
			<Step>
				<StepLabel>Account Credentials</StepLabel>
				<StepContent>
					{/* Account Credentials Form */}
					<Stack
						component='form'
						onSubmit={(e) => {
							e.preventDefault()
							handleContinue()
						}}
						spacing={3}
					>
						<Stack spacing={1}>
							<FormField inputId='email' label='Email'>
								<OutlinedInput id='email' size='small' />
							</FormField>
							<FormField
								inputId='password'
								label='Choose Password'
							>
								<OutlinedInput size='small' />
							</FormField>
							<FormField
								inputId='confirmPassword'
								label='Confirm Password'
							>
								<OutlinedInput size='small' />
							</FormField>
						</Stack>
						<Stack direction='row'>
							<Button variant='containedPurple' type='submit'>
								Continue
							</Button>
						</Stack>
					</Stack>
				</StepContent>
			</Step>
			<Step>
				<StepLabel>Personal Details</StepLabel>
				<StepContent>
					{/* Personal Details Form */}
					<Stack
						component='form'
						onSubmit={(e) => {
							e.preventDefault()
							handleContinue()
						}}
						spacing={3}
					>
						<Stack spacing={1}>
							<FormField inputId='name' label='Name'>
								<OutlinedInput id='name' size='small' />
							</FormField>
							<FormField inputId='city' label='City'>
								<OutlinedInput id='city' size='small' />
							</FormField>
							<FormField inputId='state' label='State'>
								<OutlinedInput id='state' size='small' />
							</FormField>
						</Stack>
						<Stack direction='row' spacing={1}>
							<Button
								variant='containedNeutral'
								onClick={handleBack}
							>
								Back
							</Button>
							<Button variant='containedPurple' type='submit'>
								Continue
							</Button>
						</Stack>
					</Stack>
				</StepContent>
			</Step>
			<Step>
				<StepLabel>Auditory Preferences</StepLabel>
				<StepContent>
					{/* Auditory Preferences Form */}
					<Stack
						component='form'
						onSubmit={(e) => {
							e.preventDefault()
							handleSubmit()
						}}
						spacing={3}
						sx={{ width: "fit-content", maxWidth: "320px" }}
					>
						<Stack spacing={1}>
							<Stack spacing={1}>
								<Typography component='h4'>
									Instruments
								</Typography>
								<Stack spacing={1}>
									<Typography variant='caption'>
										Please tell us the instrument you play
										and your skill level with that
										instrument.
									</Typography>
									<Typography variant='caption'>
										Skill level is rated 1-10, with 1 being
										an absolute beginner and 10 being a
										savant.
									</Typography>
									<Typography
										variant='caption'
										sx={{ justifyItems: "center" }}
									>
										Click the{" "}
										<AddCircleIcon
											sx={{ fontSize: "14px" }}
										/>{" "}
										icon to add additional instruments.
									</Typography>
								</Stack>
							</Stack>
							<Stack>
								{[...Array(instrumentCt)].map((_, idx) => (
									<Stack
										key={idx}
										direction='row'
										spacing={3}
										sx={{ width: "fit-content" }}
									>
										<FormField
											inputId={`instrument-${idx}`}
											label='Instrument'
										>
											<OutlinedInput
												id={`instrument-${idx}`}
												size='small'
												sx={{ width: "100px" }}
											/>
										</FormField>
										<FormField
											inputId={`skillLevel-${idx}`}
											label='Skill Level'
										>
											<SkillSlider
												id={`skillLevel-${idx}`}
											/>
										</FormField>
										{idx > 0 &&
											idx === instrumentCt - 1 && (
												<Box
													sx={{
														display: "flex",
														justifyContent:
															"center",
														alignItems: "center",
													}}
												>
													<IconButton
														size='small'
														sx={{
															p: 0,
															"&:hover": {
																backgroundColor:
																	"purple.main",
															},
														}}
														onClick={
															removeInstrument
														}
													>
														<DeleteIcon
															sx={{
																color: "white.main",
															}}
														/>
													</IconButton>
												</Box>
											)}
									</Stack>
								))}
								<Box
									sx={{
										width: "100px",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<IconButton
										size='small'
										sx={{
											p: 0,
											"&:hover": {
												backgroundColor: "purple.main",
											},
										}}
										onClick={addInstrument}
									>
										<AddCircleIcon
											sx={{ color: "white.main" }}
										/>
									</IconButton>
								</Box>
							</Stack>
						</Stack>
						<Stack spacing={1}>
							<Stack spacing={1}>
								<Typography component='h4'>
									Preferred Genres
								</Typography>
								<Stack spacing={1}>
									<Typography variant='caption'>
										Please tell us your preferred style of
										play.
									</Typography>
									<Typography
										variant='caption'
										sx={{ justifyItems: "center" }}
									>
										Click the{" "}
										<AddCircleIcon
											sx={{ fontSize: "14px" }}
										/>{" "}
										icon to add additional styles.
									</Typography>
								</Stack>
							</Stack>
							<Stack spacing={2}>
								{[...Array(genreCt)].map((_, idx) => (
									<FormField
										inputId={`genre-${idx}`}
										label='Genre'
									>
										<Stack
											key={idx}
											direction='row'
											spacing={3}
											sx={{ width: "fit-content" }}
										>
											<OutlinedInput
												id={`genre-${idx}`}
												size='small'
												sx={{ width: "100px" }}
											/>
											{idx > 0 && idx === genreCt - 1 && (
												<Box
													sx={{
														display: "flex",
														justifyContent:
															"center",
														alignItems: "center",
													}}
												>
													<IconButton
														size='small'
														sx={{
															p: 0,
															"&:hover": {
																backgroundColor:
																	"purple.main",
															},
														}}
														onClick={removeGenre}
													>
														<DeleteIcon
															sx={{
																color: "white.main",
															}}
														/>
													</IconButton>
												</Box>
											)}
										</Stack>
									</FormField>
								))}
								<Box
									sx={{
										width: "100px",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<IconButton
										size='small'
										sx={{
											p: 0,
											"&:hover": {
												backgroundColor: "purple.main",
											},
										}}
										onClick={addGenre}
									>
										<AddCircleIcon
											sx={{ color: "white.main" }}
										/>
									</IconButton>
								</Box>
							</Stack>
						</Stack>
						<Stack direction='row' spacing={1}>
							<Button
								variant='containedNeutral'
								onClick={handleBack}
							>
								Back
							</Button>
							<Button variant='containedPurple' type='submit'>
								Finish
							</Button>
						</Stack>
					</Stack>
				</StepContent>
			</Step>
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
