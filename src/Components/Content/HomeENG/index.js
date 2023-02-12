import React, { useEffect, useState } from "react"
import RecentEpisodeENG from "../RecentEpisodeENG"
import TopAiringENG from "../TopAiringENG"
import useDocumentTitle from "../DocumentTitleHook"
import TrendingAnimeENG from "../TrendingAnimeENG"
import RandomAnimeENG from "../RandomAnimeENG"
import AiringScheduleENG from "../AiringScheduleENG"
import LazyLoad from "react-lazyload"
import axios from "axios"
import { API } from "../../../constants"

function HomeENG() {
	const [loadingAiring, setLoadingAiring] = useState(true)
	const [topAiring, setTopAiring] = useState([])
	// ---------
	const [loadingRecentAnime, setLoadingRecentAnime] = useState(true)
	const [recentAnime, setRecentAnime] = useState([])
	// ---------
	const [loadingTrending, setLoadingTrending] = useState(true)
	const [trendingAnime, setTrendingAnime] = useState([])
	// ---------
	const [loadingAiringSchedule, setLoadingAiringSchedule] = useState(true)
	const [airingSchedule, setAiringSchedule] = useState([])
	// ---------
	const [loadingRandomAnime, setLoadingRandomAnime] = useState(true)
	const [randomAnime, setRandomAnime] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getTopAiring = async () => {
			await axios
				.get(`${API}/eng/top-airing`, {
					cancelToken: source.token,
				})
				.then((topAiring) => {
					setTopAiring(topAiring.data.data.results)
					setLoadingAiring(false)
				})
				.then(async () => await getRecentAnime())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getRecentAnime = async () => {
			await axios
				.get(`${API}/eng/recent-anime`, {
					cancelToken: source.token,
				})
				.then((getRecentData) => {
					setRecentAnime(getRecentData.data.data.results)
					setLoadingRecentAnime(false)
				})
				.then(async () => getTrendingAnime())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getTrendingAnime = async () => {
			await axios
				.get(`${API}/eng/popular`, {
					cancelToken: source.token,
				})
				.then((trendingAnime) => {
					setTrendingAnime(trendingAnime.data.data.results)
					setLoadingTrending(false)
				})
				.then(async () => await getAiringSchedule())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getAiringSchedule = async () => {
			await axios
				.get(`${API}/eng/schedule`, {
					cancelToken: source.token,
				})
				.then((scheduleAnime) => {
					setAiringSchedule(scheduleAnime.data.data.results)
					setLoadingAiringSchedule(false)
				})
				.then(async () => await getRandomAnime())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getRandomAnime = async () => {
			await axios
				.get(`${API}/eng/random-anime`, {
					cancelToken: source.token,
				})
				.then((randomAnime) => {
					if (randomAnime.data.success === false) {
						setRandomAnime([])
						setLoadingRandomAnime(true)
					} else {
						setRandomAnime(randomAnime.data.data)
						setLoadingRandomAnime(false)
					}
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
			<LazyLoad>
				<TopAiringENG loadingAiring={loadingAiring} topAiring={topAiring} />
			</LazyLoad>
			<LazyLoad>
				<RecentEpisodeENG
					loadingRecentAnime={loadingRecentAnime}
					recentAnime={recentAnime}
				/>
			</LazyLoad>
			<LazyLoad>
				<TrendingAnimeENG
					loadingTrending={loadingTrending}
					trendingAnime={trendingAnime}
				/>
			</LazyLoad>
			<LazyLoad>
				<AiringScheduleENG
					loadingAiringSchedule={loadingAiringSchedule}
					airingSchedule={airingSchedule}
				/>
			</LazyLoad>
			<LazyLoad>
				<RandomAnimeENG
					loadingRandomAnime={loadingRandomAnime}
					randomAnime={randomAnime}
				/>
			</LazyLoad>
		</>
	)
}

export default HomeENG
