import {
    Stack,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import YupPassword from "yup-password"

YupPassword(Yup)

// Components
import AccountLoginForm from "../forms/AccountLoginForm"

export interface LoginFormValues {
	email: string
	password: string
}

// Login form to authenticate the user
const LoginController = () => {
	// form validation
	const formik = useFormik<LoginFormValues>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Email address is required"),
			password: Yup.string().password().required("Password is Required"),
		}),
		onSubmit: (values) => {
			handleLogin()
			console.log(values)
		},
	})

	// Login button - TODO: Implement login authentication
	const handleLogin = () => {
        // Authenticate user
        console.log("login");

        // If there's an authentication error:
        handleError();

        // Route to user's home page if login is successful
	}

	// Handle authentication error, reset form
	const handleError = () => {
		formik.resetForm()

		// Remove focus of active
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	}

	return (
		<Stack>
            <AccountLoginForm
                formik={formik}
                handleSubmit={handleLogin}
            />
		</Stack>
	)
}

export default LoginController
