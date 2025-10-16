import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material"
import { useRef, useState, type ChangeEvent, type DragEvent } from "react"
import { states } from "../../../utils/states"
import theme from "../../../utils/theme"

// Icons
import AddCircleIcon from "@mui/icons-material/AddCircle"
import DeleteIcon from "@mui/icons-material/Delete"
import UploadFileIcon from "@mui/icons-material/UploadFile"

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
	const [file, setFile] = useState<File | null>(null)

	const imageRef = useRef<HTMLInputElement | null>(null)

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

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
	) => {
		e.preventDefault()
		let files: File[] | null = null
		if ("dataTransfer" in e) {
			// DragEvent
			let rawFiles = Array.from(e.dataTransfer.files)
			files = rawFiles.filter((file) => file.type.startsWith("image/"))
		} else {
			// ChangeEvent
			let rawFiles = e.target.files
			files = rawFiles ? Array.from(rawFiles) : null
		}
		console.log(files)

		// selected file state
		if (files && files.length > 0) {
			setFile(files[0])
		}
	}

	return (
		<Stepper
			activeStep={activeStep}
			orientation='vertical'
			sx={{ maxWidth: "400px" }}
		>
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
								<OutlinedInput
									id='email'
									size='small'
									required
								/>
							</FormField>
							<FormField
								inputId='password'
								label='Choose Password'
							>
								<OutlinedInput
									id='password'
									size='small'
									required
								/>
							</FormField>
							<FormField
								inputId='confirmPassword'
								label='Confirm Password'
							>
								<OutlinedInput
									id='confirmPassword'
									size='small'
									required
								/>
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
								<OutlinedInput
									id='name'
									size='small'
									required
								/>
							</FormField>
							<FormField inputId='city' label='City'>
								<OutlinedInput
									id='city'
									size='small'
									required
								/>
							</FormField>
							<FormField inputId='state' label='State'>
								<Select id='state' size='small' required>
									{states.map((state) => (
										<MenuItem
											key={state.id}
											value={state.id}
										>
											{state.name}
										</MenuItem>
									))}
								</Select>
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
				<StepLabel>Profile Details</StepLabel>
				<StepContent>
					{/* Profile Details Form */}
					<Stack
						component='form'
						onSubmit={(e) => {
							e.preventDefault()
							handleContinue()
						}}
						spacing={3}
					>
						<Stack spacing={1}>
							<FormField
								inputId='profileImg'
								label='Profile Picture'
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 1,
										backgroundColor: "purple.light",
										padding: "5px 15px 10px 10px",
										borderRadius: "15px",
										border: `3px dashed ${theme.palette.purple.main}`,
										width: "250px",
									}}
									onDragOver={(e) => e.preventDefault()}
									onDrop={(e) => {
										handleFileChange(e)
									}}
								>
									<UploadFileIcon
										sx={{
											color: "purple.main",
											fontSize: "3.5rem",
										}}
									/>
									<Stack
										sx={{
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										{file ? (
											<>
												{" "}
												<Typography
													variant='caption'
													textAlign='center'
													sx={{
														maxWidth: "140px",
														overflow: "hidden",
														whiteSpace: "nowrap",
														textOverflow:
															"ellipsis",
														fontWeight: 600,
													}}
												>
													{file.name}
												</Typography>
												<IconButton
													size='small'
													sx={{
														p: 0,
														"&:hover": {
															backgroundColor:
																"purple.main",
														},
													}}
													onClick={() => {
														setFile(null)
													}}
												>
													<DeleteIcon
														sx={{
															color: "purple.main",
															"&:hover": {
																color: "white.main",
															},
														}}
													/>
												</IconButton>
											</>
										) : (
											<>
												<Typography
													variant='caption'
													textAlign='center'
													sx={{ fontWeight: 600 }}
												>
													Drag and drop your file
													<br />
													or
												</Typography>
												<Button
													variant='containedPurple'
													sx={{
														padding: "0px 15px",
													}}
													onClick={(e) => {
														e.stopPropagation()
														imageRef.current?.click()
													}}
												>
													Upload File
												</Button>
											</>
										)}
									</Stack>
								</Box>
								<input
									id='profileImg'
									type='file'
									ref={imageRef}
									accept='image/*'
									style={{ display: "none" }}
									onChange={(e) => {
										handleFileChange(e)
									}}
								/>
							</FormField>
							<FormField inputId='bio' label='Bio'>
								<OutlinedInput
									id='bio'
									multiline
									size='small'
									placeholder='Up to 200 characters...'
									rows={4}
									sx={{ width: "275px" }}
									inputProps={{ maxLength: 200 }}
									required
								/>
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
											<Select
												id={`instrument-${idx}`}
												sx={{ width: "150px" }}
												size='small'
												required
											>
												{states.map((state) => (
													<MenuItem
														key={state.id}
														value={state.id}
													>
														{state.name}
													</MenuItem>
												))}
											</Select>
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
														onClick={() =>
															setInstrumentCt(
																(prevCt) =>
																	prevCt - 1
															)
														}
													>
														<DeleteIcon
															sx={{
																color: "gray.main",
																"&:hover": {
																	color: "white.main",
																},
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
										onClick={() =>
											setInstrumentCt(
												(prevCt) => prevCt + 1
											)
										}
									>
										<AddCircleIcon
											sx={{
												color: "gray.main",
												"&:hover": {
													color: "white.main",
												},
											}}
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
											<Select
												id={`genre-${idx}`}
												size='small'
												sx={{ width: "150px" }}
												required
											>
												{states.map((state) => (
													<MenuItem
														key={state.id}
														value={state.id}
													>
														{state.name}
													</MenuItem>
												))}
											</Select>
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
														onClick={() =>
															setGenreCt(
																(prevCt) =>
																	prevCt - 1
															)
														}
													>
														<DeleteIcon
															sx={{
																color: "gray.main",
																"&:hover": {
																	color: "white.main",
																},
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
										onClick={() =>
											setGenreCt((prevCt) => prevCt + 1)
										}
									>
										<AddCircleIcon
											sx={{
												color: "gray.main",
												"&:hover": {
													color: "white.main",
												},
											}}
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
				open={open}
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
