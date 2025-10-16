import { Slider } from "@mui/material"

const SkillSlider = ({
	id,
	name,
	value,
	onChange,
}: {
	id: string
	name: string
	value: number
	onChange: (value: number) => void
}) => {
	const createMarks = (currValue: number) =>
		Array.from({ length: 10 }, (_, i) => ({
			value: i + 1,
			label: i + 1 === currValue ? `${i + 1}` : "",
		}))

	return (
		<Slider
			id={id}
			name={name}
			value={value}
			step={1}
			min={1}
			max={10}
			marks={createMarks(value)}
			onChange={(_e, newValue) => onChange(newValue)}
		/>
	)
}

export default SkillSlider
