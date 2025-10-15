import { Button, Stack, TextField, Typography } from "@mui/material"

const AccountCredentials = ({
	handleBack,
	handleSubmit,
}: {
	handleBack: () => void
	handleSubmit: () => void
}) => {
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
				<Stack>
					<Typography variant='h6'>Email</Typography>
					<TextField size='small' />
				</Stack>
				<Stack>
					<Typography variant='h6'>Choose Password</Typography>
					<TextField size='small' />
				</Stack>
				<Stack>
					<Typography variant='h6'>Confirm Password</Typography>
					<TextField size='small' />
				</Stack>
			</Stack>
			<Stack direction='row'>
				<Button
					variant='containedNeutral'
					disabled
					onClick={handleBack}
				>
					Back
				</Button>
				<Button variant='containedPurple' type='submit'>
					Continue
				</Button>
			</Stack>
		</Stack>
	)
}

export default AccountCredentials
