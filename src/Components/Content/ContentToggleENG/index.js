import { useNavigate } from "react-router-dom"

function ContentToggleENG({ routeChecking }) {
	const navigate = useNavigate()
	const buttonClassName = `rounded-sm bg-white/20 hover:opacity-80 duration-500 ease-in-out font-bold px-[6px]`
	return (
		<div>
			{routeChecking < 0 ? (
				<button
					onClick={() => {
						navigate("/eng/manga")
					}}
					className={buttonClassName}
				>
					Anime
				</button>
			) : (
				<button
					onClick={() => {
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
