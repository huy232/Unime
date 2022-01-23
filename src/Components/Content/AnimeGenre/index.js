import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GENRES } from "../../../constants"

function AnimeGenre() {
	const [animeGenre, setAnimeGenre] = useState("")

	const { genre } = useParams()
	useEffect(() => {
		for (let i = 0; i < GENRES.length; i++) {
			if (genre == GENRES[i].slug) {
				setAnimeGenre(GENRES[i].name)
			}
		}
	}, [genre])

	return (
		<>
			<div>Anime {animeGenre}</div>
		</>
	)
}

export default AnimeGenre
