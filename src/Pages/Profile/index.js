import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Contexts/auth"
import { API } from "../../constants"

function Profile() {
	const navigate = useNavigate()
	const [profileParams] = useSearchParams()
	const { user } = useAuth()
	const lang = profileParams.get("lang")

	const [loadingProfile, setLoadingProfile] = useState(true)
	const [profileData, setProfileData] = useState()
	const [count, setCount] = useState(0)
	const [page, setPage] = useState(1)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getProfileData = async () => {
			if (lang === "vi") {
				axios.get(`${API}/vi/get-history?page=${page}`).then((response) => {
					console.log(response.data.data)
				})
			}
			if (lang === "eng") {
				axios.get(`${API}/get-history?page=${page}`).then((response) => {
					console.log(response.data.data)
				})
			}
			if (lang !== "vi" && lang !== "eng") {
				navigate("/")
			}
		}

		getProfileData()
	}, [lang, navigate])

	return <div>Profile</div>
}

export default Profile
