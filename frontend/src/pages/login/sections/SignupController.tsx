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
import { useFormik } from "formik"
import * as Yup from "yup"
import YupPassword from "yup-password"

YupPassword(Yup)

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

type Instrument = {
	instrument: string
	skillLevel: number
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
	const [activeStep, setActiveStep] = useState(0)
	const [instrumentCount, setInstrumentCount] = useState(1)
	const [genreCount, setGenreCount] = useState(1)

	// Ref for implicit file input click
	const imageRef = useRef<HTMLInputElement | null>(null)

	// form validation
	const formik = useFormik<{
		email: string
		password: string
		confirmPassword: string
		name: string
		city: string
		state: string
		bio: string
		profile_pic: File | undefined
		instruments: Instrument[]
		genres: string[]
	}>({
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

	// Handles both file change types - drop and upload
	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
	) => {
		e.preventDefault()
		let files: File[] | null = null
		if ("dataTransfer" in e) {
			// DragEvent
			const rawFiles = Array.from(e.dataTransfer.files)
			files = rawFiles.filter((file) => file.type.startsWith("image/"))
		} else {
			// ChangeEvent
			const rawFiles = e.target.files
			files = rawFiles ? Array.from(rawFiles) : null
		}

		// selected file state
		if (files && files.length > 0) {
			formik.setFieldValue("profile_pic", files[0])
		}
	}

	// Reset form and close
	const handleResetAndClose = () => {
		// TODO: add an edit check with formik.dirty to confirm losing changes

		formik.resetForm()
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
				onClose={handleResetAndClose}
			>
				<DialogTitle sx={{ fontSize: "25px", fontWeight: 600 }}>
					Create an account
				</DialogTitle>
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
								<Stack
									component='form'
									onSubmit={(e) => {
										e.preventDefault()
										handleContinue()
									}}
									spacing={3}
								>
									<Stack spacing={1}>
										{/* Email Field */}
										<FormField
											inputId='email'
											label='Email'
											errors={formik.errors.email}
											touched={formik.touched.email}
										>
											<OutlinedInput
												id='email'
												name='email'
												size='small'
												required
												value={formik.values.email}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormField>

										{/* Password Field */}
										<FormField
											inputId='password'
											label='Choose Password'
											errors={formik.errors.password}
											touched={formik.touched.password}
										>
											<OutlinedInput
												id='password'
												name='password'
												type='password'
												size='small'
												required
												value={formik.values.password}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormField>

										{/* Confirm PW Field */}
										<FormField
											inputId='confirmPassword'
											label='Confirm Password'
											errors={
												formik.errors.confirmPassword
											}
											touched={
												formik.touched.confirmPassword
											}
										>
											<OutlinedInput
												id='confirmPassword'
												size='small'
												name='confirmPassword'
												type='password'
												required
												value={
													formik.values
														.confirmPassword
												}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormField>
									</Stack>
									<Stack direction='row'>
										<Button
											variant='containedPurple'
											type='submit'
										>
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
										{/* Name Field */}
										<FormField
											inputId='name'
											label='Name'
											errors={formik.errors.name}
											touched={formik.touched.name}
										>
											<OutlinedInput
												id='name'
												size='small'
												name='name'
												required
												value={formik.values.name}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormField>

										{/* City Field */}
										<FormField
											inputId='city'
											label='City'
											errors={formik.errors.city}
											touched={formik.touched.city}
										>
											<OutlinedInput
												id='city'
												size='small'
												name='city'
												required
												value={formik.values.city}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormField>

										{/* State Field */}
										<FormField
											inputId='state'
											label='State'
											errors={formik.errors.state}
											touched={formik.touched.state}
										>
											<Select
												id='state'
												size='small'
												required
												name='state'
												value={formik.values.state}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
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
									</Stack>
									<Stack direction='row' spacing={1}>
										<Button
											variant='containedNeutral'
											onClick={handleBack}
										>
											Back
										</Button>
										<Button
											variant='containedPurple'
											type='submit'
										>
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
										{/* Profile Image Field */}
										<FormField label='Profile Picture'>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													gap: 1,
													backgroundColor:
														"purple.light",
													padding:
														"5px 15px 10px 10px",
													borderRadius: "15px",
													border: `3px dashed ${theme.palette.purple.main}`,
													width: "250px",
												}}
												onDragOver={(e) =>
													e.preventDefault()
												}
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
														justifyContent:
															"center",
													}}
												>
													{formik.values
														.profile_pic ? (
														<>
															{" "}
															<Typography
																variant='caption'
																textAlign='center'
																sx={{
																	maxWidth:
																		"140px",
																	overflow:
																		"hidden",
																	whiteSpace:
																		"nowrap",
																	textOverflow:
																		"ellipsis",
																	fontWeight: 600,
																}}
															>
																{
																	(
																		formik
																			.values
																			.profile_pic as File
																	).name
																}
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
																	formik.setFieldValue(
																		"profile_pic",
																		null
																	)
																}}
															>
																<DeleteIcon
																	sx={{
																		color: "purple.main",
																		"&:hover":
																			{
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
																sx={{
																	fontWeight: 600,
																}}
															>
																Drag and drop
																your file
																<br />
																or
															</Typography>
															<Button
																variant='containedPurple'
																sx={{
																	padding:
																		"0px 15px",
																}}
																onClick={(
																	e
																) => {
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
												type='file'
												ref={imageRef}
												accept='image/*'
												style={{ display: "none" }}
												onChange={(e) => {
													handleFileChange(e)
												}}
											/>
										</FormField>

										{/* Bio Field */}
										<FormField
											inputId='bio'
											label='Bio'
											errors={formik.errors.bio}
											touched={formik.touched.bio}
										>
											<OutlinedInput
												id='bio'
												multiline
												size='small'
												placeholder='Up to 200 characters...'
												rows={4}
												sx={{ width: "275px" }}
												inputProps={{ maxLength: 200 }}
												required
												value={formik.values.bio}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
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
										<Button
											variant='containedPurple'
											type='submit'
										>
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
										formik.handleSubmit()
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
													Please tell us the
													instrument you play and your
													skill level with that
													instrument.
												</Typography>
												<Typography variant='caption'>
													Skill level is rated 1-10,
													with 1 being an absolute
													beginner and 10 being a
													savant.
												</Typography>
												<Typography
													variant='caption'
													sx={{
														justifyItems: "center",
													}}
												>
													Click the{" "}
													<AddCircleIcon
														sx={{
															fontSize: "14px",
														}}
													/>{" "}
													icon to add additional
													instruments.
												</Typography>
											</Stack>
										</Stack>

										{/* Instrument Field(s) */}
										<Stack>
											{[...Array(instrumentCount)].map(
												(_, idx) => (
													<Stack
														key={idx}
														direction='row'
														spacing={3}
														sx={{
															width: "fit-content",
														}}
													>
														<FormField
															inputId={`instrument-${idx}`}
															label='Instrument'
															errors={
																(
																	formik
																		.errors
																		.instruments?.[
																		idx
																	] as {
																		instrument?: string
																	}
																)?.instrument
															}
															touched={
																formik.touched
																	.instruments?.[
																	idx
																]?.instrument
															}
														>
															<Select
																id={`instrument-${idx}`}
																name={`instruments[${idx}].instrument`}
																sx={{
																	width: "150px",
																}}
																size='small'
																required
																value={
																	formik
																		.values
																		.instruments[
																		idx
																	].instrument
																}
																onChange={
																	formik.handleChange
																}
																onBlur={
																	formik.handleBlur
																}
															>
																{states.map(
																	(state) => (
																		<MenuItem
																			key={
																				state.id
																			}
																			value={
																				state.id
																			}
																		>
																			{
																				state.name
																			}
																		</MenuItem>
																	)
																)}
															</Select>
														</FormField>
														<FormField
															inputId={`skillLevel-${idx}`}
															label='Skill Level'
															errors={
																(
																	formik
																		.errors
																		.instruments?.[
																		idx
																	] as {
																		skillLevel?: string
																	}
																)?.skillLevel
															}
															touched={
																formik.touched
																	.instruments?.[
																	idx
																]?.skillLevel
															}
														>
															<SkillSlider
																id={`skillLevel-${idx}`}
																name={`instruments[${idx}].skillLevel`}
																value={
																	formik
																		.values
																		.instruments[
																		idx
																	].skillLevel
																}
																onChange={(
																	value: number
																) => {
																	formik.setFieldValue(
																		`instruments[${idx}].skillLevel`,
																		value
																	)
																}}
															/>
														</FormField>
														{idx > 0 &&
															idx ===
																instrumentCount -
																	1 && (
																<Box
																	sx={{
																		display:
																			"flex",
																		justifyContent:
																			"center",
																		alignItems:
																			"center",
																	}}
																>
																	<IconButton
																		size='small'
																		sx={{
																			p: 0,
																			"&:hover":
																				{
																					backgroundColor:
																						"purple.main",
																				},
																		}}
																		onClick={() => {
																			setInstrumentCount(
																				(
																					prevCount
																				) =>
																					prevCount -
																					1
																			)
																			formik.setFieldValue(
																				"instruments",
																				formik.values.instruments.slice(
																					0,
																					-1
																				)
																			)
																		}}
																	>
																		<DeleteIcon
																			sx={{
																				color: "gray.main",
																				"&:hover":
																					{
																						color: "white.main",
																					},
																			}}
																		/>
																	</IconButton>
																</Box>
															)}
													</Stack>
												)
											)}
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
															backgroundColor:
																"purple.main",
														},
													}}
													onClick={() => {
														setInstrumentCount(
															(prevCount) =>
																prevCount + 1
														)

														formik.setFieldValue(
															"instruments",
															[
																...formik.values
																	.instruments,
																{
																	instrument:
																		"",
																	skillLevel: 1,
																},
															]
														)
													}}
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
													Please tell us your
													preferred style of play.
												</Typography>
												<Typography
													variant='caption'
													sx={{
														justifyItems: "center",
													}}
												>
													Click the{" "}
													<AddCircleIcon
														sx={{
															fontSize: "14px",
														}}
													/>{" "}
													icon to add additional
													styles.
												</Typography>
											</Stack>
										</Stack>

										{/* Genre Field(s) */}
										<Stack spacing={2}>
											{[...Array(genreCount)].map(
												(_, idx) => (
													<FormField
														key={idx}
														inputId={`genre-${idx}`}
														label='Genre'
														errors={
															formik.errors
																.genres?.[idx]
														}
														touched={
															Array.isArray(
																formik.touched
																	.genres
															)
																? formik.touched
																		.genres[
																		idx
																  ]
																: undefined
														}
													>
														<Stack
															direction='row'
															spacing={3}
															sx={{
																width: "fit-content",
															}}
														>
															<Select
																id={`genre-${idx}`}
																name={`genres[${idx}]`}
																size='small'
																sx={{
																	width: "150px",
																}}
																required
																value={
																	formik
																		.values
																		.genres[
																		idx
																	]
																}
																onChange={
																	formik.handleChange
																}
																onBlur={
																	formik.handleBlur
																}
															>
																{states.map(
																	(state) => (
																		<MenuItem
																			key={
																				state.id
																			}
																			value={
																				state.id
																			}
																		>
																			{
																				state.name
																			}
																		</MenuItem>
																	)
																)}
															</Select>
															{idx > 0 &&
																idx ===
																	genreCount -
																		1 && (
																	<Box
																		sx={{
																			display:
																				"flex",
																			justifyContent:
																				"center",
																			alignItems:
																				"center",
																		}}
																	>
																		<IconButton
																			size='small'
																			sx={{
																				p: 0,
																				"&:hover":
																					{
																						backgroundColor:
																							"purple.main",
																					},
																			}}
																			onClick={() => {
																				setGenreCount(
																					(
																						prevCount
																					) =>
																						prevCount -
																						1
																				)
																				formik.setFieldValue(
																					"genres",
																					formik.values.genres.slice(
																						0,
																						-1
																					)
																				)
																			}}
																		>
																			<DeleteIcon
																				sx={{
																					color: "gray.main",
																					"&:hover":
																						{
																							color: "white.main",
																						},
																				}}
																			/>
																		</IconButton>
																	</Box>
																)}
														</Stack>
													</FormField>
												)
											)}
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
															backgroundColor:
																"purple.main",
														},
													}}
													onClick={() => {
														setGenreCount(
															(prevCount) =>
																prevCount + 1
														)
														formik.setFieldValue(
															"genres",
															[
																...formik.values
																	.genres,
																"",
															]
														)
													}}
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
										<Button
											variant='containedPurple'
											type='submit'
										>
											Finish
										</Button>
									</Stack>
								</Stack>
							</StepContent>
						</Step>
					</Stepper>
				</DialogContent>
			</Dialog>
		</Stack>
	)
}

export default SignupController
