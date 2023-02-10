import { useState, useEffect } from "react"
import { CardGroup } from "react-bootstrap"
import useDocumentTitle from "../DocumentTitleHook"
import axios from "axios"
// COMPONENTS
import NewAnime from "../NewAnime"
import MostWatched from "../MostWatched"
import AnimeCollectionCard from "../AnimeCollectionCard"
import RandomAnime from "../RandomAnime"
import "./home.css"
import { useAuth } from "../../../Contexts/auth"
import HomeENG from "../HomeENG"

function Home({ instance }) {
	const [newAnime, setNewAnime] = useState([])
	const [rankToday, setRankToday] = useState([])
	const [randomAnime, setRandomAnime] = useState({})
	const [done1, setDone1] = useState(false)
	const [done2, setDone2] = useState(false)
	const [done3, setDone3] = useState(false)

	const { language } = useAuth()
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
					setDone1(true)
				})
				.then(async () => {
					await instance
						.get("/top", {
							cancelToken: source.token,
						})
						.then((data) => {
							setRankToday(data.data.data)
							setDone2(true)
						})
						.then(async () => {
							await instance
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
						})
						.catch((thrown) => {
							if (axios.isCancel(thrown)) return
						})
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		if (localStorage.getItem("unime-language") === "vi" || language === "vi") {
			getNew()
		}

		return () => {
			source.cancel()
		}
	}, [instance, language])

	useDocumentTitle(language !== "eng" ? "Trang chủ - Unime" : "HOME - Unime")

	return (
		<>
			{language !== "eng" ? (
				<>
					<div className="anime-card mt-[6px]">
						<h1 className="anime-newest font-black inline-block mb-[20px]">
							MỚI NHẤT
						</h1>
						<CardGroup>
							<NewAnime newAnime={newAnime} done1={done1} />
						</CardGroup>
					</div>
					<div className="anime-card-today my-[40px]">
						<div className="center-title mb-[20px]">
							<h1 className="anime-top-day font-black">XEM NHIỀU TRONG NGÀY</h1>
						</div>
						<CardGroup>
							<MostWatched rankToday={rankToday} done2={done2} />
						</CardGroup>
					</div>
					<div className="anime-collection mt-[40px]">
						<div className="center-title">
							<div className="anime-collection-titleholder">
								<h1
									className="anime-collection-heading font-black"
									style={{ marginBottom: "42px" }}
								>
									BỘ SƯU TẬP
								</h1>
							</div>
							<AnimeCollectionCard />
						</div>
					</div>
					<RandomAnime randomAnime={randomAnime} done3={done3} />
				</>
			) : (
				<HomeENG />
			)}
		</>
	)
}

export default Home
