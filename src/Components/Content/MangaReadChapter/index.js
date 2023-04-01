import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { API, IO_CORS } from "../../../constants"

function MangaReadChapter({ currentChapter, provider }) {
	const [currentChapterList, setCurrentChapterList] = useState([])
	const [loadingCurrentChapter, setLoadingCurrentChapter] = useState(true)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getCurrentChapter = async () => {
			await axios
				.get(
					`${API}/manga-chapter?chapterId=${currentChapter}&provider=${provider}`
				)
				.then((data) => {
					if (data.data.success) {
						setCurrentChapterList(data.data.data)
						setLoadingCurrentChapter(false)
					}
				})
				.catch((thrown) => {
					setCurrentChapterList([])
					setLoadingCurrentChapter(true)
					if (axios.isCancel(thrown)) return
				})
		}
		getCurrentChapter()
		return () => {
			source.cancel()
		}
	}, [currentChapter])
	return (
		<div>
			<ul>
				{currentChapterList.map((page) => (
					<img src={`${IO_CORS}${page.img}`} alt={page.title} />
				))}
			</ul>
		</div>
	)
}

export default MangaReadChapter
