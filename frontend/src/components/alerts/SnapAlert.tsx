import { Alert, Snackbar, type SnackbarCloseReason } from "@mui/material"
import type { ReactNode, SyntheticEvent } from "react"

interface SnapAlertProps {
	message: string | ReactNode
	open: boolean
	setOpen: (value: boolean) => void
	severity?: "success" | "error" | "warning" | "info"
}

const SnapAlert = ({
	message,
	open,
	setOpen,
	severity = "success",
}: SnapAlertProps) => {
	const handleClose = (
		_event: SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		// Avoid missed alert due to accidental clickaway
		if (reason === "clickaway") {
			return
		}
		setOpen(false)
	}

	return (
		<Snackbar
			open={open}
			onClose={handleClose}
			autoHideDuration={4000}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			<Alert severity={severity}>{message}</Alert>
		</Snackbar>
	)
}

export default SnapAlert
