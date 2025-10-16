import { FormControl, Typography } from "@mui/material"
import type { ReactNode } from "react"

interface FormFieldProps {
	children: ReactNode
	inputId?: string
	label: string
	errors?: string | undefined
	touched?: boolean | undefined
}

const FormField = ({
	children,
	inputId = "",
	label,
	errors,
	touched,
}: FormFieldProps) => {
	return (
		<FormControl>
			<Typography
				component='label'
				htmlFor={inputId}
				variant='formLabel'
				color={touched && errors ? "jamRed.main" : "purple.dark"}
				sx={{ maxWidth: "150px" }}
			>
				{touched && errors ? errors : label}
			</Typography>
			{children}
		</FormControl>
	)
}

export default FormField
