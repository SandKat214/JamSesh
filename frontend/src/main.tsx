import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { CssBaseline, ThemeProvider } from "@mui/material"

// styles
import "./index.css"
import "@fontsource-variable/mulish"
import theme from "./utils/theme.ts"

// routing
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>
)
