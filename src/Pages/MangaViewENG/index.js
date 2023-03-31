import React from "react"
import { useSearchParams } from "react-router-dom"

function MangaViewENG() {
	const [searchParams] = useSearchParams()
	const mangaID = searchParams.get("mangaID")
	const chapterID = searchParams.get("chapterID")
	const provider = searchParams.get("provider")
	return <div>MangaViewENG</div>
}

export default MangaViewENG
