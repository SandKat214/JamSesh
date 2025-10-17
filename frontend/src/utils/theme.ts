import { createTheme } from "@mui/material/styles"

const colors = {
	purple: {
		main: "#8457FF",
		light: "rgba(176, 158, 255, 0.39)",
		dark: "#261E34",
	},
	gray: {
		main: "#575757",
	},
	white: {
		main: "#F8F8F8",
		light: "#ECECEC",
		dark: "#D0D0D0",
		contrastText: "#E9E9E9",
	},
	jamRed: {
		main: "#DD2D60",
	},
}

const theme = createTheme({
	palette: {
		purple: {
			main: colors.purple.main,
			light: colors.purple.light,
			dark: colors.purple.dark,
		},
		gray: {
			main: colors.gray.main,
		},
		white: {
			main: colors.white.main,
			dark: colors.white.dark,
			light: colors.white.light,
			contrastText: colors.white.contrastText,
		},
		jamRed: {
			main: colors.jamRed.main,
		},
	},
	typography: {
		fontFamily: "Mulish, sans-serif",
		allVariants: {
			color: colors.purple.dark,
			letterSpacing: "0.5px",
			whiteSpace: "normal",
			wordBreak: "break-word",
		},
		formLabel: {
			fontSize: ".85rem",
		},
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { variant: "containedPurple" },
					style: {
						textTransform: "none",
						backgroundColor: colors.purple.main,
						color: colors.white.main,
						fontSize: "0.87rem",
						borderRadius: "12px",
						padding: "2px 23px",
						boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
						width: "fit-content",
					},
				},
				{
					props: { variant: "containedNeutral" },
					style: {
						textTransform: "none",
						backgroundColor: colors.white.light,
						color: colors.gray.main,
						fontSize: "0.87rem",
						borderRadius: "12px",
						padding: "2px 23px",
						boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
						width: "fit-content",
						"&.Mui-disabled": {
							display: "none",
						},
					},
				},
			],
		},
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					scrollbarWidth: "thin",
					scrollbarColor: `${colors.purple.main} ${colors.white.main}`,
				},
				// "*::-webkit-scrollbar": {
				// 	width: "8px",
				// 	borderRadius: "40px",
				// },
				// "*::-webkit-scrollbar-track": {
				// 	backgroundColor: colors.white.main,
				// 	borderRadius: "40px",
				// },
				// "*::-webkit-scrollbar-thumb": {
				// 	backgroundColor: colors.purple.main,
				// 	borderRadius: "10px",
				// },
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					backgroundColor: "rgba(248, 248, 248, 0.75)",
					borderRadius: "25px",
					paddingX: "10px",
					paddingBottom: "20px",
					backdropFilter: "blur(10px)",
					WebkitBackdropFilter: "blur(10px)",
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					fontSize: "25px",
					fontWeight: 600,
					textAlign: "center",
				},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					"& .MuiInputBase-root": {
						fontSize: "0.9rem",
						borderRadius: "12px",
						color: colors.purple.dark,
					},
					"& .MuiInputBase-input": {
						padding: "4px 15px",
					},
					"& .MuiOutlinedInput-root": {
						backgroundColor: colors.white.main,
						padding: 0,
						"& fieldset": {
							border: `2px solid ${colors.white.dark}`,
						},
						"&:hover fieldset": {
							borderColor: colors.purple.main,
						},
						"&.Mui-focused fieldset": {
							borderColor: colors.purple.main,
						},
					},
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					width: "150px",
					marginBottom: "15px",
				},
				mark: {
					color: colors.purple.main,
					width: "4px",
					height: "4px",
					borderRadius: "100%",
				},
				markLabel: {
					fontSize: ".85rem",
					color: colors.jamRed.main,
					top: "30px",
				},
				rail: {
					backgroundColor: colors.white.main,
				},
				thumb: {
					backgroundColor: colors.jamRed.main,
					width: "15px",
					height: "15px",
					"&:hover, &.Mui-active": {
						boxShadow: `0 0 0 8px ${colors.jamRed.main}33`,
					},
				},
				track: {
					color: colors.jamRed.main,
					height: "3px",
				},
			},
		},
		MuiStepConnector: {
			styleOverrides: {
				line: {
					borderColor: colors.gray.main,
				},
			},
		},
		MuiStepContent: {
			styleOverrides: {
				root: {
					borderLeft: `1px solid ${colors.gray.main}`,
				},
			},
		},
		MuiStepIcon: {
			styleOverrides: {
				root: {
					color: colors.gray.main,
					"&.Mui-active": {
						color: colors.purple.main,
					},
					"&.Mui-completed": {
						color: colors.gray.main,
					},
				},
			},
		},
		MuiStepLabel: {
			styleOverrides: {
				label: {
					color: colors.gray.main,
					"&.Mui-active": {
						color: colors.purple.main,
					},
				},
			},
		},
	},
})

export default theme
