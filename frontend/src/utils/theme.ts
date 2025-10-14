import { createTheme } from "@mui/material/styles"

declare module "@mui/material/styles" {
	interface Palette {
		purple: Palette["primary"]
		gray: Palette["primary"]
		jamRed: Palette["primary"]
		white: Palette["primary"]
	}

	interface PaletteOptions {
		purple?: PaletteOptions["primary"]
		gray?: PaletteOptions["primary"]
		jamRed?: PaletteOptions["primary"]
		white?: PaletteOptions["primary"]
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		containedPurple: true
		containedNeutral: true
	}
}

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
		dark: "#ECECEC",
		light: "#D0D0D0",
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
		fontFamily: "'Mulish', sans-serif",
		allVariants: {
			color: colors.purple.dark,
			letterSpacing: "0.5px",
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
						borderRadius: "12px",
						padding: "2px 23px",
						boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
					},
				},
				{
					props: { variant: "containedNeutral" },
					style: {
						textTransform: "none",
						backgroundColor: colors.white.dark,
						color: colors.gray.main,
						borderRadius: "12px",
						padding: "2px 23px",
						boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
						"&.Mui-disabled": {
							display: "none",
						},
					},
				},
			],
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
