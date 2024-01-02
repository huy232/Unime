import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import InfoBannerENG from "../../Components/Content/InfoBannerENG"
import InfoBoxENG from "../../Components/Content/InfoBoxENG"
import InfoDetailENG from "../../Components/Content/InfoDetailENG"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import { API } from "../../constants"

function AnimeInfoENG() {
	const { animeId } = useParams()
	const [info, setInfo] = useState({})
	const [loading, setLoading] = useState(true)
	const [provider, setProvider] = useState("gogoanime")
	const [loadingProvider, setLoadingProvider] = useState(true)
	const [title, setTitle] = useState("Loading")
	const [loadingEpisodeList, setLoadingEpisodeList] = useState(true)
	const [watchNow, setWatchNow] = useState(null)

	useEffect(() => {
		window.scrollTo(0, 0)
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getInfo = async () => {
			await axios
				.get(`${API}/eng/info/${animeId}&${provider}`, {
					cancelToken: source.token,
				})
				.then((data) => {
					setTitle(
						data.data.data.title?.english ||
							data.data.data.title?.romaji ||
							data.data.data.title?.native
					)
					setInfo(data.data.data)
					setWatchNow(data.data.data.episodes[0] || null)
					setLoading(false)
					setLoadingEpisodeList(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getInfo()

		return () => {
			source.cancel()
		}
	}, [animeId, provider])

	useDocumentTitle(title)
	return (
		<div className="mb-8">
			<InfoBannerENG loading={loading} info={info} />
			<div className="w-full flex relative max-lg:flex-col">
				<InfoBoxENG loading={loading} info={info} />
				<InfoDetailENG
					watchNow={watchNow}
					loading={loading}
					info={info}
					setProvider={setProvider}
					provider={provider}
					loadingProvider={loadingProvider}
					setLoadingProvider={setLoadingProvider}
					setLoading={setLoading}
					itemId={animeId}
					setInfo={setInfo}
					loadingEpisodeList={loadingEpisodeList}
					setLoadingEpisodeList={setLoadingEpisodeList}
					setWatchNow={setWatchNow}
				/>
			</div>
		</div>
	)
}

export default AnimeInfoENG
