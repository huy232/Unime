import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import InfoBannerENG from "../../Components/Content/InfoBannerENG"
import InfoBoxENG from "../../Components/Content/InfoBoxENG"
import InfoDetailENG from "../../Components/Content/InfoDetailENG"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import { API } from "../../constants"
import errorImage from "../../Utilities/img/error.webp"

function AnimeInfoENG() {
	const { animeId } = useParams()
	const [info, setInfo] = useState({})
	const [loading, setLoading] = useState(true)
	const [provider, setProvider] = useState("")
	const [loadingProvider, setLoadingProvider] = useState(true)
	const [title, setTitle] = useState("Loading")
	const [watchNow, setWatchNow] = useState(null)
	const [providerOptions, setProviderOptions] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getInfo = async () => {
			await axios
				.get(`${API}/eng/info/${animeId}`, {
					cancelToken: source.token,
				})
				.then((response) => {
					const data = response.data.data
					setTitle(
						data.title?.english || data.title?.romaji || data.title?.native
					)
					const providers = data.mappings.filter(
						(provider) => provider.providerType === "ANIME"
					)
					let defaultProviderId = "gogoanime"
					const defaultProvider = providers.find(
						(provider) => provider.providerId === defaultProviderId
					)
					const selectedProvider =
						defaultProvider?.providerId || providers[0]?.providerId || ""
					setProvider(selectedProvider)
					setProviderOptions(providers)
					setInfo(data)
					if (selectedProvider) {
						const providerEpisode = data.episodes.find(
							(list) => list.providerId === selectedProvider
						)
						setWatchNow(providerEpisode.episodes[0])
					} else {
						setWatchNow(null)
					}
				})
				.catch((thrown) => {
					if (thrown.response.status === 404) {
						setError(true)
					}
					if (axios.isCancel(thrown)) return
				})
				.finally(() => setLoading(false))
		}

		getInfo()

		return () => {
			source.cancel()
		}
	}, [animeId])

	useDocumentTitle(title)
	return (
		<div className="mb-8">
			{error ? (
				<div className="flex flex-col justify-center items-center gap-2">
					<img src={errorImage} alt="Error not found anime" />
					<span className="text-lg">
						There was something wrong with this one anime, come back later...😖
					</span>
					<Link
						className="border-orange-500 rounded border-2 p-1 hover:bg-orange-500 duration-300 ease-linear hover:text-black"
						to={`/eng`}
					>
						Back to home page
					</Link>
				</div>
			) : (
				<>
					{" "}
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
							setWatchNow={setWatchNow}
							providerOptions={providerOptions}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default AnimeInfoENG
