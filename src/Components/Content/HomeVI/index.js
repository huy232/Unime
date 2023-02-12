import React, { useEffect, useState } from "react"
import axios from "axios"
import LazyLoad from "react-lazyload"
// COMPONENTS
import RandomAnime from "../RandomAnime"
import RecentAnimeVI from "../RecentAnimeVI"
import MostWatchVI from "../MostWatchVI"
import CollectionsVI from "../CollectionsVI"
import "./home.css"

function HomeVI({ instance }) {
	const [newAnime, setNewAnime] = useState([])
	const [done1, setDone1] = useState(false)
	// ----------
	const [rankToday, setRankToday] = useState([])
	const [done2, setDone2] = useState(false)
	// ----------
	const [randomAnime, setRandomAnime] = useState({})
	const [done3, setDone3] = useState(false)

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
					setDone2(true)
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
					setDone3(true)
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
				<RecentAnimeVI newAnime={newAnime} done1={done1} />
			</LazyLoad>
			<LazyLoad>
				<MostWatchVI rankToday={rankToday} done2={done2} />
			</LazyLoad>
			<LazyLoad>
				<CollectionsVI />
			</LazyLoad>
			<LazyLoad>
				<RandomAnime randomAnime={randomAnime} done3={done3} />
			</LazyLoad>
		</>
	)
}

export default HomeVI
