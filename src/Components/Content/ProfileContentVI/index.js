import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from "../../../constants"

function ProfileContentVI({ data, userId }) {
	const navigate = useNavigate()
	const [profileParams] = useSearchParams()
	const lang = profileParams.get("lang")
	const [page, setPage] = useState(1)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getProfileData = async () => {
			await axios
				.get(`${API}/get-history?page=${page}`, { userId: userId })
				.then((response) => {
					console.log(response.data.data)
				})
		}

		getProfileData()
		return () => {
			source.cancel()
		}
	}, [lang, navigate, page])
	return <div>{console.log(data)}</div>
}

export default ProfileContentVI
