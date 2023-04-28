import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Contexts/auth"
import { API } from "../../constants"
import ProfileContentVI from "../../Components/Content/ProfileContentVI"
import ProfileContentENG from "../../Components/Content/ProfileContentENG"

function Profile() {
	const navigate = useNavigate()
	const [profileParams] = useSearchParams()
	const { user } = useAuth()
	const lang = profileParams.get("lang")

	return (
		<div>
			{lang === "vi" && <ProfileContentVI />}
			{lang === "eng" && <ProfileContentENG />}
			{lang !== "vi" && lang !== "eng" && navigate("/")}
		</div>
	)
}

export default Profile
