import { useState, useEffect } from "react"
import axios from "axios"
import { API } from "../../../constants"
import InfiniteScroll from "react-infinite-scroll-component"
import useDocumentTitle from "../../../Hooks/useDocumentTitle"

function MangaBrowseENG({ subUrl, title }) {
	const [mangaData, setMangaData] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(0)
	const [totalPage, setTotalPage] = useState(0)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getManga = async () => {
			await axios
				.get(`${API}/${subUrl}`, {
					cancelToken: source.token,
				})
				.then((data) => {
					if (data.data.success) {
						const mangaPayload = data.data.data
						const mangaObject = Object.values(mangaPayload)[0]
						setMangaData(mangaObject.media)
						setPage(mangaObject.pageInfo.currentPage)
						setTotalPage(mangaObject.pageInfo.lastPage)
						setLoading(false)
					}
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getManga()
	}, [subUrl])

	useDocumentTitle(`${title} MANGA - Unime`)

	return <>{loading ? "Loading" : <div></div>}</>
}

export default MangaBrowseENG
