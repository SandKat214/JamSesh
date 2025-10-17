/**
 * Citation for the image drag/drop and uploader:
 * Date: 10/15/2025
 * Adapted from code given in blog, but oriented for use with
 * Material UI components and validation/state tracking using
 * the formik package library.
 * Source URL:
 * https://medium.com/@waliahmadfiles/building-a-file-upload-component-with-drag-and-drop-in-react-712efcc5383b
 */

import {
	Box,
	Button,
	IconButton,
	OutlinedInput,
	Stack,
	Typography,
} from "@mui/material"
import theme from "../../../utils/theme"
import { type ChangeEvent, type DragEvent, useRef } from "react"
import type { FormikProps } from "formik"
import type { SignupFormValues } from "../sections/SignupController"

// Icons
import DeleteIcon from "@mui/icons-material/Delete"
import UploadFileIcon from "@mui/icons-material/UploadFile"

// Components
import FormField from "../../../components/forms/FormField"
import FormButtons from "../../../components/forms/FormButtons"

interface ProfileDetailsFormProps {
	formik: FormikProps<SignupFormValues>
	handleBack: () => void
	handleSubmit: () => void
}

const ProfileDetailsForm = ({
	formik,
	handleBack,
	handleSubmit,
}: ProfileDetailsFormProps) => {
	// Ref for implicit file <input> click
	const imageRef = useRef<HTMLInputElement | null>(null)

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

	return (
		<Stack
			component='form'
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
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
							{formik.values.profile_pic ? (
								<>
									{" "}
									<Typography
										variant='caption'
										textAlign='center'
										sx={{
											maxWidth: "140px",
											overflow: "hidden",
											whiteSpace: "nowrap",
											textOverflow: "ellipsis",
											fontWeight: 700,
										}}
									>
										{
											(formik.values.profile_pic as File)
												.name
										}
									</Typography>
									<IconButton
										size='small'
										sx={{
											p: 0,
											"&:hover": {
												backgroundColor: "purple.main",
											},
										}}
										onClick={() => {
											formik.setFieldValue(
												"profile_pic",
												undefined
											)
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
										sx={{
											fontWeight: 600,
										}}
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
			<FormButtons
				handleUndo={handleBack}
				submitLabel='Continue'
				undoLabel='Back'
			/>
		</Stack>
	)
}

export default ProfileDetailsForm
