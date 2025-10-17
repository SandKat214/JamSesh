import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { AuthProvider } from "./hooks/auth/AuthContext.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// styles
import "./index.css" // nothing in this file yet, left it in case we want to use, otherwise delete
import theme from "./utils/theme.ts"

// routing
import App from "./App.tsx"

// tanstack query provider
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<App />
				</ThemeProvider>
			</QueryClientProvider>
		</AuthProvider>
	</StrictMode>
)
