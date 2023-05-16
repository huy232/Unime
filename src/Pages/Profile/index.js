import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Contexts/auth"
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
			<div className="flex justify-center w-full pt-4">
				<button
					className={`${
						lang === "vi" && "bg-orange-600"
					} rounded-l-lg bg-black/20 px-4 py-2 duration-200 ease-in-out transition-all`}
					onClick={() => toggleButton("vi")}
				>
					VI
				</button>
				<button
					className={`${
						lang === "eng" && "bg-orange-600"
					} rounded-r-lg bg-black/20 px-4 py-2 duration-200 ease-in-out transition-all`}
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
