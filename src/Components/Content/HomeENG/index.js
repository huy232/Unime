import React, { useState, useEffect } from "react"
import { API } from "../../../constants"
import axios from "axios"
import RecentEpisodeENG from "../RecentEpisodeENG"
import TopAiringENG from "../TopAiringENG"
import PopularAnimeENG from "../PopularAnimeENG"
import MoviesAnimeENG from "../MoviesAnimeENG"
import useDocumentTitle from "../DocumentTitleHook"

function HomeENG() {
	const [loadingAiring, setLoadingAiring] = useState(true)
	const [topAiring, setTopAiring] = useState([])
	const [loadingRecentAnime, setLoadingRecentAnime] = useState(true)
	const [recentAnime, setRecentAnime] = useState([])
	const [loadingPopular, setLoadingPopular] = useState(true)
	const [popularAnime, setPopularAnime] = useState([])
	const [loadingMovies, setLoadingMovies] = useState(true)
	const [moviesAnime, setMoviesAnime] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getTopAiring = async () => {
			await axios
				.get(`${API}/eng/top-airing`, { cancelToken: source.token })
				.then((topAiring) => {
					setTopAiring(topAiring.data.data)
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
				.get(`${API}/eng/recent-anime`, { cancelToken: source.token })
				.then((getRecentData) => {
					setRecentAnime(getRecentData.data.data)
					setLoadingRecentAnime(false)
				})
				.then(() => getPopularAnime())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getPopularAnime = async () => {
			await axios
				.get(`${API}/eng/popular`, { cancelToken: source.token })
				.then((popularAnime) => {
					setPopularAnime(popularAnime.data.data)
					setLoadingPopular(false)
				})
				.then(getMoviesAnime())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getMoviesAnime = async () => {
			await axios
				.get(`${API}/eng/movies`, { cancelToken: source.token })
				.then((popularAnime) => {
					setMoviesAnime(popularAnime.data.data)
					setLoadingMovies(false)
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

	return (
		<>
			{useDocumentTitle(`HOME - Unime`)}
			<TopAiringENG topAiring={topAiring} loadingAiring={loadingAiring} />
			<RecentEpisodeENG
				recentAnime={recentAnime}
				loadingRecentAnime={loadingRecentAnime}
			/>
			<PopularAnimeENG
				popularAnime={popularAnime}
				loadingPopular={loadingPopular}
			/>
			<MoviesAnimeENG loadingMovies={loadingMovies} moviesAnime={moviesAnime} />
		</>
	)
}

export default HomeENG
