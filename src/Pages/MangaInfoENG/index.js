import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { API } from "../../constants"
import InfoBannerENG from "../../Components/Content/InfoBannerENG"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import InfoBoxENG from "../../Components/Content/InfoBoxENG"
import MangaInfoDetailENG from "../../Components/Content/MangaInfoDetailENG"

function MangaInfoENG() {
	const { mangaID } = useParams()
	const [info, setInfo] = useState({})
	const [loading, setLoading] = useState(true)
	const [provider, setProvider] = useState("mangakakalot")
	const [loadingProvider, setLoadingProvider] = useState(true)
	const [title, setTitle] = useState("Loading")
	const [loadingChapterList, setLoadingChapterList] = useState(true)
	const [mangaLanguageOption, setMangaLanguageOption] = useState([])
	useEffect(() => {
		window.scrollTo(0, 0)
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		axios
			.get(`${API}/manga-info/${mangaID}&${provider}`, {
				cancelToken: source.token,
			})
			.then((response) => {
				if (response.data.success) {
					const data = response.data.data
					if (provider === "mangareader") {
						let language = []
						for (let i = 0; i < data.chapters.length - 1; i++) {
							const current = data.chapters[i].id.split("/")[1]
							const next = data.chapters[i + 1].id.split("/")[1]
							if (current !== next) {
								language.push(current, next)
							}
						}
						setMangaLanguageOption([...new Set(language)])
					} else {
						setMangaLanguageOption([])
					}
					setInfo(data)
					const mangaTitle =
						data.title?.english || data.title?.romaji || data.title?.native
					setTitle(mangaTitle)
					setLoading(false)
					setLoadingChapterList(false)
				}
			})
			.catch((thrown) => {
				if (axios.isCancel(thrown)) return
			})
		return () => {
			source.cancel()
		}
	}, [mangaID, provider])
	useDocumentTitle(`${title} - MANGA`)
	return (
		<div>
			<InfoBannerENG loading={loading} info={info} />
			<div className="w-full flex relative max-lg:flex-col">
				<InfoBoxENG loading={loading} info={info} />
				<MangaInfoDetailENG
					loading={loading}
					info={info}
					setProvider={setProvider}
					provider={provider}
					loadingProvider={loadingProvider}
					setLoadingProvider={setLoadingProvider}
					setLoading={setLoading}
					itemId={mangaID}
					setInfo={setInfo}
					loadingEpisodeList={loadingChapterList}
					setLoadingEpisodeList={setLoadingChapterList}
					mangaLanguageOption={mangaLanguageOption}
				/>
			</div>
		</div>
	)
}

export default MangaInfoENG
