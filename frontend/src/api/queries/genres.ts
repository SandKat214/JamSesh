import { queryOptions } from "@tanstack/react-query"
import axios from "axios"

export const genresOptions = () =>
	queryOptions({
		queryKey: ["genres"],
		queryFn: async () => {
			try {
				const res = await axios.get(
					import.meta.env.VITE_JAMSESH_API + "genres"
				)

				return res.data
			} catch (err) {
				// TODO: Add snackbar alert
				console.log(err)
				return []
			}
		},
		staleTime: Infinity, // genres shouldn't really change
	})
