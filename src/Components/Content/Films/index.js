import React, { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../../constants"
import FilmsContent from "../FilmsContent"

function Films() {
	const [type, setType] = useState("movies")
	const [films, setFilms] = useState([])
	const [loadingFilm, setLoadingFilm] = useState(true)
	const [latestMovies, setLatestMovies] = useState([])
	const [loadingLatestMovies, setLoadingLatestMovies] = useState(true)
	const [latestTv, setLatestTv] = useState([])
	const [loadingLatestTv, setLoadingLatestTv] = useState(true)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getFilms = async () => {
			await axios
				.get(`${API}/trending-films`, {
					cancelToken: source.token,
				})
				.then((data) => {
					setFilms(data.data.data)
					setLoadingFilm(false)
				})
				.then(async () => {
					await axios
						.get(`${API}/latest-movies`, {
							cancelToken: source.token,
						})
						.then((data) => {
							setLatestMovies(data.data.data)
							setLoadingLatestMovies(false)
						})
						.then(async () => {
							await axios
								.get(`${API}/latest-tv`, {
									cancelToken: source.token,
								})
								.then((data) => {
									setLatestTv(data.data.data)
									setLoadingLatestTv(false)
								})
						})
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getFilms()

		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			<div>
				<h2 className="font-black mx-[20px]">TRENDING</h2>
				<div className="md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full">
					<div className="my-[12px]">
						<button
							className={`p-[8px] m-[8px] duration-500 rounded ease-in-out hover:opacity-80 ${
								type === "movies" && "bg-[#a5612a]"
							}`}
							onClick={() => setType("movies")}
							id="movie-btn"
							aria-label="Movie Button"
						>
							Movies
						</button>
						<button
							className={`p-[8px] m-[8px] duration-500 rounded ease-in-out hover:opacity-80 ${
								type === "tvshows" && "bg-[#a5612a]"
							}`}
							onClick={() => setType("tvshows")}
							id="series-btn"
							aria-label="Series button"
						>
							TV Shows
						</button>
					</div>
				</div>
				{type === "movies" ? (
					<FilmsContent loading={loadingFilm} films={films.movies} />
				) : (
					<FilmsContent loading={loadingFilm} films={films.tvshows} />
				)}
				<h2 className="decoration-solid underline font-black mx-[20px]">
					LATEST MOVIES
				</h2>
				<FilmsContent loading={loadingLatestMovies} films={latestMovies} />
				<h2 className="decoration-solid underline font-black mx-[20px]">
					LATEST SERIES
				</h2>
				<FilmsContent loading={loadingLatestTv} films={latestTv} />
			</div>
		</>
	)
}

export default Films
