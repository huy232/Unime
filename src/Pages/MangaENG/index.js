import React, { useEffect, useState } from "react"
import LazyLoad from "react-lazyload"
import axios from "axios"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import { API } from "../../constants"
import MangaHeadingENG from "../../Components/Content/MangaHeadingENG"
import MangaLayoutENG from "../../Components/Content/MangaLayoutENG"

function MangaENG() {
	const [manga, setManga] = useState({
		manhwa: {},
		popular: {},
		top: {},
		trending: {},
	})
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		axios
			.get(`${API}/manga`, { cancelToken: source.token })
			.then((response) => {
				if (response.data.success) {
					setManga({
						manhwa: response.data.data.manhwa.media,
						popular: response.data.data.popular.media,
						top: response.data.data.top.media,
						trending: response.data.data.trending.media,
					})
					setLoading(false)
				}
			})
			.catch((thrown) => {
				if (axios.isCancel(thrown)) return
			})
		return () => {
			source.cancel()
		}
	}, [])

	useDocumentTitle("MANGA - Unime")
	return (
		<>
			<LazyLoad>
				<MangaHeadingENG content={manga.top} loading={loading} />
			</LazyLoad>
			<LazyLoad>
				<MangaLayoutENG
					content={manga.trending}
					loading={loading}
					headingTitle={"TRENDING"}
					color={"#301E67"}
					navigateUrl={"trending"}
				/>
			</LazyLoad>
			<LazyLoad>
				<MangaLayoutENG
					content={manga.popular}
					loading={loading}
					headingTitle={"POPULAR"}
					color={"#1e6743"}
					navigateUrl={"popular"}
				/>
			</LazyLoad>
			<LazyLoad>
				<MangaLayoutENG
					content={manga.manhwa}
					loading={loading}
					headingTitle={"MANHWA"}
					color={"#67661e"}
					navigateUrl={"manhwa"}
				/>
			</LazyLoad>
		</>
	)
}

export default MangaENG
