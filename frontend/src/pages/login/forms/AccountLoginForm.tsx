import { OutlinedInput, Stack } from "@mui/material"
import type { FormikProps } from "formik"
import type { LoginFormValues } from "../sections/LoginController"

// Components
import FormField from "../../../components/forms/FormField"
import FormButtons from "../../../components/forms/FormButtons"

interface AccountLoginFormProps {
	formik: FormikProps<LoginFormValues>
	handleSubmit: () => void
}

const AccountLoginForm = ({
	formik,
	handleSubmit,
}: AccountLoginFormProps) => {
	return (
		<Stack
			component='form'
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
			spacing={2}
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
					label='Password'
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
			</Stack>
			<FormButtons
				handleUndo={() => {}}
				submitLabel='Login'
				undoDisabled={true}
				undoLabel='Back'
			/>
		</Stack>
	)
}

export default AccountLoginForm
