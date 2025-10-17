import { MenuItem, OutlinedInput, Select, Stack } from "@mui/material"
import type { FormikProps } from "formik"
import type { SignupFormValues } from "../sections/SignupController"
import { states } from "../../../utils/states"

// Components
import FormField from "../../../components/forms/FormField"
import FormButtons from "../../../components/forms/FormButtons"

interface PersonalDetailsFormProps {
	formik: FormikProps<SignupFormValues>
	handleBack: () => void
	handleSubmit: () => void
}

const PersonalDetailsForm = ({
	formik,
	handleBack,
	handleSubmit,
}: PersonalDetailsFormProps) => {
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
							<MenuItem key={state.id} value={state.id}>
								{state.name}
							</MenuItem>
						))}
					</Select>
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

export default PersonalDetailsForm
