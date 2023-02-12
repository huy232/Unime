import { useEffect, useState } from "react"
import axios from "axios"
import "./recentepisode.css"
import AnimeSkeletonENG from "../AnimeSkeletonENG"
import RecentAnimeENGComp from "../RecentAnimeENGComp"
import { API } from "../../../constants"

function RecentEpisodeENG() {
	const [loadingRecentAnime, setLoadingRecentAnime] = useState(true)
	const [recentAnime, setRecentAnime] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getRecentAnime = async () => {
			await axios
				.get(`${API}/eng/recent-anime`, {
					cancelToken: source.token,
				})
				.then((getRecentData) => {
					setRecentAnime(getRecentData.data.data.results)
					setLoadingRecentAnime(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getRecentAnime()
		return () => {
			source.cancel()
		}
	}, [])

	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-lime-300 max-sm:text-center">
				NEWLY UPDATED
			</h1>
			{loadingRecentAnime ? (
				<AnimeSkeletonENG />
			) : (
				<RecentAnimeENGComp recentAnime={recentAnime} />
			)}
		</div>
	)
}

export default RecentEpisodeENG
