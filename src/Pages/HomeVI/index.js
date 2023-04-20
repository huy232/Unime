import React, { useEffect, useState } from "react"
import axios from "axios"
import LazyLoad from "react-lazyload"
// COMPONENTS
import RandomAnime from "../../Components/Content/RandomAnime"
import RecentAnimeVI from "../../Components/Content/RecentAnimeVI"
import MostWatchVI from "../../Components/Content/MostWatchVI"
import CollectionsVI from "../../Components/Content/CollectionsVI"
import MovieList from "../../Components/Content/MovieListLayout"
import TopAiringVI from "../../Components/Content/TopAiringVI"
import "./home.css"

function HomeVI({ instance }) {
	const [slider, setSlider] = useState([])
	const [loadingSlider, setLoadingSlider] = useState(false)
	// ----------
	const [newAnime, setNewAnime] = useState([])
	const [loadingNewAnime, setLoadingNewAnime] = useState(false)
	// ----------
	const [rankToday, setRankToday] = useState([])
	const [loadingRankToday, setLoadingRankToday] = useState(false)
	// ----------
	const [movies, setMovies] = useState([])
	const [loadingMovies, setLoadingMovies] = useState(false)
	// ----------
	const [randomAnime, setRandomAnime] = useState({})
	const [loadingRandomAnime, setLoadingRandomAnime] = useState(false)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getSlider = async () => {
			await instance
				.get("/slider", {
					cancelToken: source.token,
				})
				.then((data) => {
					if (data.data.success) {
						setSlider(data.data.data)
						setLoadingSlider(true)
					}
				})
				.then(async () => await getNew())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getNew = async () => {
			await instance
				.get("/newest", {
					cancelToken: source.token,
				})
				.then((data) => {
					if (data.data.success) {
						setNewAnime(data.data.data)
						setLoadingNewAnime(true)
					}
				})
				.then(async () => await getMostWatch())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getMostWatch = async () => {
			await instance
				.get("/top", {
					cancelToken: source.token,
				})
				.then((data) => {
					if (data.data.success) {
						setRankToday(data.data.data)
						setLoadingRankToday(true)
					}
				})
				.then(async () => await getMovie())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getMovie = async () => {
			await instance
				.get("/vi-movies", {
					cancelToken: source.token,
				})
				.then((data) => {
					if (data.data.success) {
						setMovies(data.data.data)
						setLoadingMovies(true)
					}
				})
				.then(async () => await getRandom())
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getRandom = async () => {
			await instance
				.get("/today", {
					cancelToken: source.token,
				})
				.then((data) => {
					if (data.data.success === false) {
						setRandomAnime([])
					} else {
						setRandomAnime(data.data.data)
					}
					setLoadingRandomAnime(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		getSlider()
		return () => {
			source.cancel()
		}
	}, [instance])

	return (
		<>
			<LazyLoad>
				<TopAiringVI data={slider} loading={loadingSlider} />
			</LazyLoad>
			<LazyLoad>
				<RecentAnimeVI newAnime={newAnime} loadingNewAnime={loadingNewAnime} />
			</LazyLoad>
			<LazyLoad>
				<MostWatchVI
					rankToday={rankToday}
					loadingRankToday={loadingRankToday}
				/>
			</LazyLoad>
			<LazyLoad>
				<MovieList data={movies} loading={loadingMovies} />
			</LazyLoad>
			<LazyLoad>
				<CollectionsVI />
			</LazyLoad>
			<LazyLoad>
				<RandomAnime
					randomAnime={randomAnime}
					loadingRandomAnime={loadingRandomAnime}
				/>
			</LazyLoad>
		</>
	)
}

export default HomeVI
