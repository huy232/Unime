import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import AnimeInfoBannerENG from "../AnimeInfoBannerENG"
import AnimeInfoBoxENG from "../AnimeInfoBoxENG"
import AnimeInfoDetailENG from "../AnimeInfoDetailENG"
import useDocumentTitle from "../DocumentTitleHook"

function AnimeInfoENG() {
	const [info, setInfo] = useState({})
	const [loading, setLoading] = useState(true)
	const [loadingProvider, setLoadingProvider] = useState(true)
	const [provider, setProvider] = useState(
		localStorage.getItem("unime-provider") || ""
	)
	const [prefer, setPrefer] = useState(
		localStorage.getItem("unime-prefer") || "vi"
	)
	const [timeZone, setTimeZone] = useState("")
	const [title, setTitle] = useState("Loading")

	const { animeId } = useParams()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [animeId])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getInfo = async () => {
			const timeZone = await axios
				.get("http://ip-api.com/json/", {
					cancelToken: source.token,
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
			const data = await axios
				.get(
					`https://api.consumet.org/meta/anilist/info/${animeId}?provider=${provider}`,
					{
						cancelToken: source.token,
					}
				)
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})

			setTimeZone(timeZone.data.timezone)
			setTitle(
				data.data.title?.english ||
					data.data.title?.romaji ||
					data.data.title?.native
			)
			setInfo(data.data)
			setLoading(false)
		}

		getInfo()
	}, [animeId, provider])

	useDocumentTitle(title)
	return (
		<div>
			<AnimeInfoBannerENG loading={loading} info={info} />
			<div className="w-100 flex relative max-lg:flex-col">
				<AnimeInfoBoxENG loading={loading} info={info} />
				<AnimeInfoDetailENG
					loading={loading}
					info={info}
					setProvider={setProvider}
					provider={provider}
					loadingProvider={loadingProvider}
					setLoadingProvider={setLoadingProvider}
					prefer={prefer}
					setPrefer={setPrefer}
					timeZone={timeZone}
				/>
			</div>
		</div>
	)
}

export default AnimeInfoENG
