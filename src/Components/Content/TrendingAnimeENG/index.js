import { useState, useEffect } from "react"
import "./popularanime.css"
import AnimeSkeletonENG from "../AnimeSkeletonENG"
import TrendingAnimeENGComp from "../TrendingAnimeENGComp"
import axios from "axios"
import { API } from "../../../constants"

function TrendingAnimeENG() {
	const [loadingTrending, setLoadingTrending] = useState(true)
	const [trendingAnime, setTrendingAnime] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getTrendingAnime = async () => {
			await axios
				.get(`${API}/eng/popular`, {
					cancelToken: source.token,
				})
				.then((trendingAnime) => {
					setTrendingAnime(trendingAnime.data.data.results)
					setLoadingTrending(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		getTrendingAnime()
		return () => {
			source.cancel()
		}
	}, [])

	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-right text-violet-500 max-sm:text-center">
				TRENDING
			</h1>
			{loadingTrending ? (
				<AnimeSkeletonENG />
			) : (
				<TrendingAnimeENGComp trendingAnime={trendingAnime} />
			)}
		</div>
	)
}

export default TrendingAnimeENG
