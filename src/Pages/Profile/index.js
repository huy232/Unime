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
	const lang = profileParams.get("lang")
	const { user } = useAuth()

	const toggleButton = (lang) => {
		navigate(`/profile?lang=${lang}`)
	}
	return (
		<div>
			<div className="flex justify-center w-full">
				<button
					className="rounded bg-orange-600 px-1 mx-1"
					onClick={() => toggleButton("vi")}
				>
					VI
				</button>
				<button
					className="rounded bg-orange-600 px-1 mx-1"
					onClick={() => toggleButton("eng")}
				>
					ENG
				</button>
			</div>
			{lang === "vi" && user && <ProfileContentVI userId={user?.id} />}
			{lang === "eng" && user && <ProfileContentENG userId={user?.id} />}
			{(!user || (lang !== "vi" && lang !== "eng")) && navigate("/")}
		</div>
	)
}

export default Profile
