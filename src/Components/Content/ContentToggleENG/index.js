import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ContentToggleENG() {
	const navigate = useNavigate()
	const [contentToggle, setContentToggle] = useState(
		JSON.parse(localStorage.getItem("unime-eng-navigate"))
	)
	const buttonClassName = `rounded-sm bg-white/20 hover:opacity-80 duration-500 ease-in-out font-bold px-[6px]`
	return (
		<div>
			{contentToggle ? (
				<button
					onClick={() => {
						localStorage.setItem("unime-eng-navigate", JSON.stringify(false))
						setContentToggle(false)
						navigate("/eng")
					}}
					className={buttonClassName}
				>
					Manga
				</button>
			) : (
				<button
					onClick={() => {
						localStorage.setItem("unime-eng-navigate", JSON.stringify(true))
						setContentToggle(true)
						navigate("/eng/manga")
					}}
					className={buttonClassName}
				>
					Anime
				</button>
			)}
		</div>
	)
}

export default ContentToggleENG
