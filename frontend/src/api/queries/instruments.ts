import { queryOptions } from "@tanstack/react-query"
import axios from "axios"

export const instrumentsOptions = () =>
	queryOptions({
		queryKey: ["instruments"],
		queryFn: async () => {
			const res = await axios.get(
				import.meta.env.VITE_JAMSESH_API + "instruments"
			)

			return res.data
		},
	})
