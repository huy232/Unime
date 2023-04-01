import axios from "axios"
import React, { useRef } from "react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { API } from "../../constants"
import { useState } from "react"
import MangaReadChapter from "../../Components/Content/MangaReadChapter"

function MangaViewENG() {
	const [searchParams] = useSearchParams()
	const mangaID = searchParams.get("mangaID")
	const chapterID = searchParams.get("chapterID")
	const provider = searchParams.get("provider")
	const prevProvider = useRef({
		provider: "",
	})
	const [chapterList, setChapterList] = useState([])
	const [loadingChapterList, setLoadingChapterList] = useState(true)
	const [loadingCurrentChapter, setLoadingCurrentChapter] = useState(true)

	useEffect(() => {
		if (prevProvider.current.provider !== provider) {
			prevProvider.current.provider = provider
			const CancelToken = axios.CancelToken
			const source = CancelToken.source()
			const getChapterList = async () => {
				await axios
					.get(`${API}/manga-info/${mangaID}&${provider}`)
					.then((data) => {
						if (data.data.success) {
							setChapterList(data.data.data.chapters)
							setLoadingChapterList(false)
						}
					})
					.catch((thrown) => {
						setChapterList([])
						setLoadingChapterList(true)
						if (axios.isCancel(thrown)) return
					})
			}
			getChapterList()
			return () => {
				source.cancel()
			}
		}
	}, [mangaID, provider])

	return (
		<div>
			{loadingChapterList ? (
				""
			) : (
				<MangaReadChapter currentChapter={chapterID} provider={provider} />
			)}
		</div>
	)
}

export default MangaViewENG
