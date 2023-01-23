import React, { useState, useEffect } from "react"
import { API } from "../../../constants"
import axios from "axios"
import RecentEpisodeENG from "../RecentEpisodeENG"
import TopAiringENG from "../TopAiringENG"
import useDocumentTitle from "../DocumentTitleHook"
import TrendingAnimeENG from "../TrendingAnimeENG"
import RandomAnimeENG from "../RandomAnimeENG"

function HomeENG() {
	const [loadingAiring, setLoadingAiring] = useState(true)
	const [topAiring, setTopAiring] = useState([])
	const [loadingRecentAnime, setLoadingRecentAnime] = useState(true)
	const [recentAnime, setRecentAnime] = useState([])
	const [loadingTrending, setLoadingTrending] = useState(true)
	const [trendingAnime, setTrendingAnime] = useState([])
	const [loadingRandomAnime, setLoadingRandomAnime] = useState(true)
	const [randomAnime, setRandomAnime] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getTopAiring = async () => {
			await axios
				.get(`https://api.consumet.org/meta/anilist/popular`, {
					cancelToken: source.token,
				})
				.then((topAiring) => {
					setTopAiring(topAiring.data.results)
					setLoadingAiring(false)
				})
				.then(() => {
					getRecentAnime()
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getRecentAnime = async () => {
			await axios
				.get(`https://api.consumet.org/meta/anilist/recent-episodes`, {
					cancelToken: source.token,
				})
				.then((getRecentData) => {
					setRecentAnime(getRecentData.data.results)
					setLoadingRecentAnime(false)
				})
				.then(() => getTrendingAnime())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getTrendingAnime = async () => {
			await axios
				.get(`https://api.consumet.org/meta/anilist/trending`, {
					cancelToken: source.token,
				})
				.then((trendingAnime) => {
					setTrendingAnime(trendingAnime.data.results)
					setLoadingTrending(false)
				})
				.then(getRandomAnime())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getRandomAnime = async () => {
			await axios
				.get(`https://api.consumet.org/meta/anilist/random-anime`, {
					cancelToken: source.token,
				})
				.then((randomAnime) => {
					setRandomAnime(randomAnime.data)
					setLoadingRandomAnime(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getTopAiring()

		return () => {
			source.cancel()
		}
	}, [])
	useDocumentTitle(`HOME - Unime`)
	return (
		<>
			<TopAiringENG topAiring={topAiring} loadingAiring={loadingAiring} />
			<RecentEpisodeENG
				recentAnime={recentAnime}
				loadingRecentAnime={loadingRecentAnime}
			/>
			<TrendingAnimeENG
				trendingAnime={trendingAnime}
				loadingTrending={loadingTrending}
			/>
			<RandomAnimeENG
				loadingRandomAnime={loadingRandomAnime}
				randomAnime={randomAnime}
			/>
		</>
	)
}

export default HomeENG
