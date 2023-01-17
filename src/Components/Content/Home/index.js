import { useState, useEffect } from "react"
import { CardGroup } from "react-bootstrap"
import useDocumentTitle from "../DocumentTitleHook"
import axios from "axios"
import LoadingBar from "react-top-loading-bar"
// COMPONENTS
import NewAnime from "../NewAnime"
import MostWatched from "../MostWatched"
import AnimeCollectionCard from "../AnimeCollectionCard"
import RandomAnime from "../RandomAnime"
import "./home.css"

function Home({ instance }) {
	const [progress, setProgress] = useState(0)
	const [newAnime, setNewAnime] = useState([])
	const [rankToday, setRankToday] = useState([])
	const [randomAnime, setRandomAnime] = useState({})
	const [done1, setDone1] = useState(false)
	const [done2, setDone2] = useState(false)
	const [done3, setDone3] = useState(false)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getNew = () => {
			instance
				.get("/newest", {
					cancelToken: source.token,
				})
				.then((data) => {
					setNewAnime(data.data.data)
					setDone1(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getRankToday = () => {
			instance
				.get("/top", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRankToday(data.data.data)
					setDone2(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		const getRandom = () => {
			instance
				.get("/today", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRandomAnime(data.data.data)
					setDone3(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		// getNew()
		Promise.all([getNew(), getRankToday(), getRandom()])
			.then()
			.catch((err) => {
				console.log(err)
			})
		return () => {
			source.cancel()
		}
	}, [instance])

	useDocumentTitle("Trang chủ - Unime")

	return (
		<>
			<LoadingBar
				color="#f11946"
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className="anime-card" style={{ marginTop: "42px" }}>
				<h2
					className="anime-h1"
					style={{ marginBottom: "42px", width: "200px" }}
				>
					MỚI NHẤT
				</h2>
				<CardGroup>
					<NewAnime newAnime={newAnime} done1={done1} />
				</CardGroup>
			</div>
			<div className="anime-card-today" style={{ marginTop: "42px" }}>
				<div className="center-title">
					<h2 className="anime-top-day-h2" style={{ marginBottom: "42px" }}>
						XEM NHIỀU TRONG NGÀY
					</h2>
				</div>
				<CardGroup>
					<MostWatched rankToday={rankToday} done2={done2} />
				</CardGroup>
			</div>
			<div className="anime-collection" style={{ marginTop: "42px" }}>
				<div className="center-title">
					<div className="anime-collection-titleholder">
						<h2
							className="anime-collection-h2"
							style={{ marginBottom: "42px" }}
						>
							BỘ SƯU TẬP
						</h2>
					</div>
					<AnimeCollectionCard />
				</div>
			</div>
			<RandomAnime randomAnime={randomAnime} done3={done3} />
		</>
	)
}

export default Home
