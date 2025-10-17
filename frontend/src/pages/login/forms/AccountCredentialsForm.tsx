import { OutlinedInput, Stack } from "@mui/material"
import type { FormikProps } from "formik"
import type { SignupFormValues } from "../sections/SignupController"

// Components
import FormField from "../../../components/forms/FormField"
import FormButtons from "../../../components/forms/FormButtons"

interface AccountCredentialsFormProps {
	formik: FormikProps<SignupFormValues>
	handleSubmit: () => void
}

const AccountCredentialsForm = ({
	formik,
	handleSubmit,
}: AccountCredentialsFormProps) => {
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
					errors={formik.errors.confirmPassword}
					touched={formik.touched.confirmPassword}
				>
					<OutlinedInput
						id='confirmPassword'
						size='small'
						name='confirmPassword'
						type='password'
						required
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</FormField>
			</Stack>
			<FormButtons
				handleUndo={() => {}}
				submitLabel='Continue'
				undoDisabled={true}
				undoLabel='Back'
			/>
		</Stack>
	)
}

export default AccountCredentialsForm
