import {
	Box,
	CircularProgress,
	IconButton,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material"
import type { FormikProps } from "formik"
import type { SignupFormValues } from "../sections/SignupController"
import { useEffect, useState } from "react"

// Queries
import { useQueries } from "@tanstack/react-query"
import { genresOptions } from "../../../api/queries/genres"
import { instrumentsOptions } from "../../../api/queries/instruments"

// Types
import type { Genre, Instrument } from "../../../definitions/types"

// Icons
import AddCircleIcon from "@mui/icons-material/AddCircle"
import DeleteIcon from "@mui/icons-material/Delete"

// Components
import FormField from "../../../components/forms/FormField"
import SkillSlider from "../../../components/forms/SkillSlider"
import FormButtons from "../../../components/forms/FormButtons"

interface AuditoryPreferencesFormProps {
	formik: FormikProps<SignupFormValues>
	handleBack: () => void
	handleResetAndClose: () => void
	setOpenAlert: (value: boolean) => void
}

const AuditoryPreferencesForm = ({
	formik,
	handleBack,
	handleResetAndClose,
	setOpenAlert,
}: AuditoryPreferencesFormProps) => {
	// track component state
	const [genreCount, setGenreCount] = useState(1)
	const [instrumentCount, setInstrumentCount] = useState(1)

	// Get genres and instruments for drop-downs
	const { data, error, isError, isLoading } = useQueries({
		queries: [genresOptions(), instrumentsOptions()],
		combine: (results) => {
			const [genres, instruments] = results
			return {
				// Combined data
				data: {
					genres: genres.data ?? [],
					instruments: instruments.data ?? [],
				},

				// Combined loading
				isLoading: results.some((q) => q.isLoading),

				// Combined errors
				isError: results.some((q) => q.isError),
				error: results.find((q) => q.isError)?.error ?? null,
			}
		},
	})

	// If fetching error, close dialog and alert user
	useEffect(() => {
		if (isError) {
			console.error(error)
			setOpenAlert(true)
			handleResetAndClose()
		}
	}, [isError])

	return (
		<Stack
			component='form'
			onSubmit={(e) => {
				e.preventDefault()
				formik.handleSubmit()
			}}
			spacing={3}
		>
			<Stack spacing={1}>
				<Stack spacing={2}>
					<Typography
						component='h3'
						sx={{ fontSize: "1.2rem", fontWeight: 600 }}
					>
						Instruments
					</Typography>
					<Stack spacing={1}>
						<Typography variant='body2'>
							Please tell us the instrument you play and your
							skill level with that instrument.
						</Typography>
						<Typography variant='body2'>
							Skill level is rated 1-10, with 1 being an absolute
							beginner and 10 being a savant.
						</Typography>
						<Typography
							variant='body2'
							sx={{
								justifyItems: "center",
							}}
						>
							Click the{" "}
							<AddCircleIcon
								sx={{
									fontSize: "16px",
								}}
							/>{" "}
							icon to add additional instruments.
						</Typography>
					</Stack>
				</Stack>

				{/* Instrument Field(s) */}
				{isLoading ? (
					<Box sx={{ padding: "25px" }}>
						<CircularProgress sx={{ color: "gray.main" }} />
					</Box>
				) : (
					<Stack spacing={2}>
						{[...Array(instrumentCount)].map((_, idx) => (
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
											formik.errors.instruments?.[
												idx
											] as {
												instrument?: string
											}
										)?.instrument
									}
									touched={
										formik.touched.instruments?.[idx]
											?.instrument
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
											formik.values.instruments[idx]
												?.instrument ?? ""
										}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										{Array.isArray(data.instruments) &&
											data.instruments.map(
												(instrument: Instrument) => (
													<MenuItem
														key={
															instrument.instrument_id
														}
														value={
															instrument.instrument_id
														}
														disabled={formik.values.instruments
															.map(
																(i) =>
																	i.instrument
															)
															.includes(
																instrument.instrument_id
															)}
													>
														{instrument.name}
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
											formik.errors.instruments?.[
												idx
											] as {
												skillLevel?: string
											}
										)?.skillLevel
									}
									touched={
										formik.touched.instruments?.[idx]
											?.skillLevel
									}
								>
									<SkillSlider
										id={`skillLevel-${idx}`}
										name={`instruments[${idx}].skillLevel`}
										value={
											formik.values.instruments[idx]
												?.skillLevel ?? 1
										}
										onChange={(value: number) => {
											formik.setFieldValue(
												`instruments[${idx}].skillLevel`,
												value
											)
										}}
									/>
								</FormField>
								{idx > 0 && idx === instrumentCount - 1 && (
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<IconButton
											size='small'
											sx={{
												p: 0,
												backgroundColor: "white.dark",
												"&:hover": {
													backgroundColor:
														"purple.main",
												},
											}}
											onClick={() => {
												setInstrumentCount(
													(prevCount) => prevCount - 1
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
									backgroundColor: "white.dark",
									"&:hover": {
										backgroundColor: "purple.main",
									},
								}}
								onClick={() => {
									setInstrumentCount(
										(prevCount) => prevCount + 1
									)

									formik.setFieldValue("instruments", [
										...formik.values.instruments,
										{
											instrument: "",
											skillLevel: 1,
										},
									])
								}}
							>
								<AddCircleIcon
									sx={{
										color: "white.main",
									}}
								/>
							</IconButton>
						</Box>
					</Stack>
				)}
			</Stack>
			<Stack spacing={1}>
				<Stack spacing={1}>
					<Typography
						component='h3'
						sx={{ fontSize: "1.2rem", fontWeight: 600 }}
					>
						Preferred Genres
					</Typography>
					<Stack spacing={1}>
						<Typography variant='body2'>
							Please tell us your preferred style of play.
						</Typography>
						<Typography
							variant='body2'
							sx={{
								justifyItems: "center",
							}}
						>
							Click the{" "}
							<AddCircleIcon
								sx={{
									fontSize: "16px",
								}}
							/>{" "}
							icon to add additional styles.
						</Typography>
					</Stack>
				</Stack>

				{/* Genre Field(s) */}
				{isLoading ? (
					<Box sx={{ padding: "25px" }}>
						<CircularProgress sx={{ color: "gray.main" }} />
					</Box>
				) : (
					<Stack spacing={2}>
						{[...Array(genreCount)].map((_, idx) => (
							<FormField
								key={idx}
								inputId={`genre-${idx}`}
								label='Genre'
								errors={formik.errors.genres?.[idx]}
								touched={
									Array.isArray(formik.touched.genres)
										? formik.touched.genres[idx]
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
										value={formik.values.genres[idx] ?? ""}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										{Array.isArray(data.genres) &&
											data.genres.map((genre: Genre) => (
												<MenuItem
													key={genre.genre_id}
													value={genre.genre_id}
													disabled={formik.values.genres.includes(
														genre.genre_id
													)}
												>
													{genre.name}
												</MenuItem>
											))}
									</Select>
									{idx > 0 && idx === genreCount - 1 && (
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<IconButton
												size='small'
												sx={{
													p: 0,
													backgroundColor:
														"white.dark",
													"&:hover": {
														backgroundColor:
															"purple.main",
													},
												}}
												onClick={() => {
													setGenreCount(
														(prevCount) =>
															prevCount - 1
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
									backgroundColor: "white.dark",
									"&:hover": {
										backgroundColor: "purple.main",
									},
								}}
								onClick={() => {
									setGenreCount((prevCount) => prevCount + 1)
									formik.setFieldValue("genres", [
										...formik.values.genres,
										"",
									])
								}}
							>
								<AddCircleIcon
									sx={{
										color: "white.main",
									}}
								/>
							</IconButton>
						</Box>
					</Stack>
				)}
			</Stack>
			<FormButtons
				handleUndo={handleBack}
				submitLabel='Finish'
				undoLabel='Back'
			/>
		</Stack>
	)
}

export default AuditoryPreferencesForm
