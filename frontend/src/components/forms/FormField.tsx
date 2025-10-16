import { FormControl, Typography } from "@mui/material"
import type { ReactNode } from "react"

interface FormFieldProps {
	children: ReactNode
	inputId: string
	label: string
}

const FormField = ({ children, inputId, label }: FormFieldProps) => {
	return (
		<FormControl>
			<Typography component='label' htmlFor={inputId} variant='formLabel'>
				{label}
			</Typography>
			{children}
		</FormControl>
	)
}

export default FormField
