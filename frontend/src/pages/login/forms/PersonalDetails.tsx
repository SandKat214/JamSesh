import { Button, Stack, TextField, Typography } from "@mui/material"

const PersonalDetails = ({
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
					<Typography variant='h6'>Name</Typography>
					<TextField size='small' />
				</Stack>
				<Stack>
					<Typography variant='h6'>City</Typography>
					<TextField size='small' />
				</Stack>
				<Stack>
					<Typography variant='h6'>State</Typography>
					<TextField size='small' />
				</Stack>
			</Stack>
			<Stack direction='row' spacing={1}>
				<Button
					variant='containedNeutral'
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

export default PersonalDetails