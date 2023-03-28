import React, { useEffect, useState } from "react"
import axios from "axios"
import LazyLoad from "react-lazyload"
// COMPONENTS
import RandomAnime from "../../Components/Content/RandomAnime"
import RecentAnimeVI from "../../Components/Content/RecentAnimeVI"
import MostWatchVI from "../../Components/Content/MostWatchVI"
import CollectionsVI from "../../Components/Content/CollectionsVI"
import MovieList from "../../Components/Content/MovieListLayout"
import "./home.css"

function HomeVI({ instance }) {
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

		const getNew = async () => {
			await instance
				.get("/newest", {
					cancelToken: source.token,
				})
				.then((data) => {
					setNewAnime(data.data.data)
					setLoadingNewAnime(true)
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
					setRankToday(data.data.data)
					setLoadingRankToday(true)
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
					setMovies(data.data.data)
					setLoadingMovies(true)
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

		getNew()

		return () => {
			source.cancel()
		}
	}, [instance])

	return (
		<>
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
