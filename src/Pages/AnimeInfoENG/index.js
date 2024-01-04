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
	const [infoENG, setInfoENG] = useState({})
	const [loading, setLoading] = useState(true)
	const [provider, setProvider] = useState("")
	const [loadingProvider, setLoadingProvider] = useState(true)
	const [title, setTitle] = useState("Loading")
	const [watchNow, setWatchNow] = useState(null)
	const [providerOptions, setProviderOptions] = useState([])

	useEffect(() => {
		window.scrollTo(0, 0)
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getInfo = async () => {
			try {
				const response = await axios.get(`${API}/eng/info/${animeId}`, {
					cancelToken: source.token,
				})

				// Extracting infoENG from HTML response
				const parser = new DOMParser()
				const htmlDoc = parser.parseFromString(response.data, "text/html")
				const scriptContent = htmlDoc.querySelector("script")?.textContent
				if (scriptContent) {
					const start = scriptContent.indexOf("{")
					const end = scriptContent.lastIndexOf("}") + 1
					const jsonContent = scriptContent.substring(start, end)
					const infoENG = JSON.parse(jsonContent)
					setInfoENG(infoENG)

					setTitle(
						infoENG.title?.english ||
							infoENG.title?.romaji ||
							infoENG.title?.native
					)

					const providers = infoENG.mappings.filter(
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
					setWatchNow(infoENG.episodes[0] || null)
					setLoading(false)
				}
			} catch (thrown) {
				if (axios.isCancel(thrown)) return
			}
		}

		getInfo()

		return () => {
			source.cancel()
		}
	}, [animeId])

	useDocumentTitle(title)

	return (
		<div className="mb-8">
			<InfoBannerENG loading={loading} info={infoENG} />
			<div className="w-full flex relative max-lg:flex-col">
				<InfoBoxENG loading={loading} info={infoENG} />
				<InfoDetailENG
					watchNow={watchNow}
					loading={loading}
					info={infoENG}
					setProvider={setProvider}
					provider={provider}
					loadingProvider={loadingProvider}
					setLoadingProvider={setLoadingProvider}
					setLoading={setLoading}
					itemId={animeId}
					setInfo={setInfoENG}
					setWatchNow={setWatchNow}
					providerOptions={providerOptions}
				/>
			</div>
		</div>
	)
}

export default AnimeInfoENG
