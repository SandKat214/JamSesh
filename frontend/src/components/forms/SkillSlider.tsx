import { Slider } from "@mui/material"
import { useState } from "react"

const SkillSlider = ({ id }: { id: string }) => {
	const [value, setValue] = useState(1)

	const createMarks = (currValue: number) =>
		Array.from({ length: 10 }, (_, i) => ({
			value: i + 1,
			label: i + 1 === currValue ? `${i + 1}` : "",
		}))

	return (
		<Slider
			id={id}
			value={value}
			step={1}
			min={1}
			max={10}
			marks={createMarks(value)}
			onChange={(_e, newValue) => setValue(newValue)}
		/>
	)
}

export default SkillSlider
