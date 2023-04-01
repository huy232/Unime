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
	const [title, setTitle] = useState()
	const [chapterList, setChapterList] = useState([])
	const [info, setInfo] = useState({})
	const [currentChapterInfo, setCurrentChapterInfo] = useState({})
	const [loadingChapterList, setLoadingChapterList] = useState(true)

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
							const mangaData = data.data.data
							setTitle(
								mangaData.title?.english ||
									mangaData.title?.romaji ||
									mangaData?.native
							)
							setInfo(mangaData)
							setChapterList(mangaData.chapters)

							setLoadingChapterList(false)
						}
					})
					.catch((thrown) => {
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
				<>
					<h2 className="font-black" style={{ color: info?.color || "#fffc" }}>
						{title}
					</h2>
					<MangaReadChapter
						currentChapter={chapterID}
						provider={provider}
						info={info}
					/>
				</>
			)}
		</div>
	)
}

export default MangaViewENG
