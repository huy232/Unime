import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { API, IO_CORS } from "../../../constants"

function MangaReadChapter({ currentChapter, provider, info }) {
	const [currentChapterList, setCurrentChapterList] = useState([])
	const [loadingCurrentChapter, setLoadingCurrentChapter] = useState(true)
	const [chapterInfo, setChapterInfo] = useState({})
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
						const chapterInfoDetail = info.chapters.find(
							(chapter) => chapter.id === currentChapter
						)
						setChapterInfo(chapterInfoDetail)
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
			{chapterInfo && (
				<h3 className="italic">
					{chapterInfo.title} -{" "}
					{chapterInfo?.chapterNumber || chapterInfo?.chapter}
				</h3>
			)}
			<ul className="text-center">
				{currentChapterList.map((page) => (
					<img
						className="aspect-[2/3] mx-auto"
						src={`${IO_CORS}${page.img}`}
						alt={page.title}
						key={page.page}
					/>
				))}
			</ul>
		</div>
	)
}

export default MangaReadChapter
