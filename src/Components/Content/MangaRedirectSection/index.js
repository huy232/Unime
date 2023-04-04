import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

function MangaRedirectSection({ mangaID }) {
	return (
		<div className="flex justify-center items-center">
			<Link
				to={`/eng/manga-info/${mangaID}`}
				className="flex items-center mx-2 p-1 bg-white/20 rounded hover:opacity-80 text-[#fffc] duration-200 ease-in-out"
			>
				<FontAwesomeIcon icon={faInfoCircle} />
				<span className="mx-1">INFO</span>
			</Link>
			<Link
				to={`/eng/manga`}
				className="flex items-center mx-2 p-1 bg-white/20 rounded hover:opacity-80 text-[#fffc] duration-200 ease-in-out"
			>
				<FontAwesomeIcon icon={faHome} />
				<span className="mx-1">HOME</span>
			</Link>
		</div>
	)
}

export default MangaRedirectSection
