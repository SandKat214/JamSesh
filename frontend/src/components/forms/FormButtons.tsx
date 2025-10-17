import { Button, Stack } from "@mui/material"

interface FormButtonsProps {
	handleUndo: () => void
	submitDisabled?: boolean
	submitLabel: string
	undoDisabled?: boolean
	undoLabel: string
}

const FormButtons = ({
	handleUndo,
	submitDisabled = false,
	submitLabel,
	undoDisabled = false,
	undoLabel,
}: FormButtonsProps) => {
	return (
		<Stack
			direction='row'
			spacing={undoDisabled || submitDisabled ? "unset" : 1}
		>
			<Button
				variant='containedNeutral'
				onClick={handleUndo}
				disabled={undoDisabled}
			>
				{undoLabel}
			</Button>
			<Button
				variant='containedPurple'
				type='submit'
				disabled={submitDisabled}
			>
				{submitLabel}
			</Button>
		</Stack>
	)
}

export default FormButtons
