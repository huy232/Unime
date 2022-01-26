import { useEffect } from "react"
import axios from "axios"

function AnimeInfo({ instance }) {
	useEffect(() => {
		window.scrollTo(0, 0)
		window.history.scrollRestoration = "manual"
	}, [])

	return <div>ANIME INFO</div>
}

export default AnimeInfo
