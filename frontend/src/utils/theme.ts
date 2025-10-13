import { createTheme } from "@mui/material/styles"

declare module "@mui/material/styles" {
	interface Palette {
		purple: Palette["primary"]
		neutral: Palette["primary"]
		jamRed: Palette["primary"]
	}

	interface PaletteOptions {
		purple?: PaletteOptions["primary"]
		neutral?: PaletteOptions["primary"]
		jamRed?: PaletteOptions["primary"]
	}
}

const theme = createTheme({
	palette: {
		purple: {
			main: "#8457FF",
			dark: "#261E34",
		},
		neutral: {
			main: "#F8F8F8",
			light: "rgba(248, 248, 248, 0.75)",
			dark: "#E9E9E9",
			contrastText: "#575757",
		},
		jamRed: {
			main: "#DD2D60",
		},
	},
	typography: {
		fontFamily: "'Mulish', sans-serif",
	},
})

export default theme
