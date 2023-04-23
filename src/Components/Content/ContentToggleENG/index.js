import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ContentToggleENG() {
	const navigate = useNavigate()
	const [contentToggle, setContentToggle] = useState(true)
	const buttonClassName = `rounded-sm bg-white/20 hover:opacity-80 duration-500 ease-in-out font-bold px-[6px]`
	return (
		<div>
			{contentToggle ? (
				<button
					onClick={() => {
						setContentToggle(false)
						navigate("/eng/manga")
					}}
					className={buttonClassName}
				>
					Anime
				</button>
			) : (
				<button
					onClick={() => {
						setContentToggle(true)
						navigate("/eng")
					}}
					className={buttonClassName}
				>
					Manga
				</button>
			)}
		</div>
	)
}

export default ContentToggleENG
