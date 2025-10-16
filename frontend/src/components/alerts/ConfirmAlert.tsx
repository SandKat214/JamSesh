import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material"
import FormButtons from "../forms/FormButtons"
import type { ReactNode } from "react"

interface ConfirmAlertProps {
	handleConfirm: () => void
	message: string | ReactNode
	open: boolean
	setOpen: (value: boolean) => void
	title?: string | null
}

const ConfirmAlert = ({
	handleConfirm,
	message,
	open,
	setOpen,
	title = null,
}: ConfirmAlertProps) => {
	return (
		<Dialog
			open={open}
			onClose={() => {}} // must confirm or deny to clear
			component='form'
			onSubmit={(e) => {
				e.preventDefault()
				setOpen(false)
			}}
			slotProps={{
				paper: {
					sx: {
						paddingX: "20px",
						maxWidth: "400px",
					},
				},
			}}
		>
			{title && (
				<DialogTitle sx={{ fontSize: "1.2rem" }}>{title}</DialogTitle>
			)}
			<DialogContent sx={{ textAlign: "center" }}>
				{message}
			</DialogContent>
			<DialogActions>
				<FormButtons
					handleUndo={() => {
						setOpen(false)
						handleConfirm()
					}}
					submitLabel='No'
					undoLabel='Yes'
				/>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmAlert
