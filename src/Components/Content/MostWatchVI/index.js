import React, { useState, useEffect } from "react"
import axios from "axios"
import { CardGroup } from "react-bootstrap"
import MostWatched from "../MostWatched"

function MostWatchVI({ instance }) {
	const [rankToday, setRankToday] = useState([])
	const [done2, setDone2] = useState(false)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getMostWatch = async () => {
			await instance
				.get("/top", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRankToday(data.data.data)
					setDone2(true)
				})
		}

		getMostWatch()

		return () => {
			source.cancel()
		}
	}, [instance])

	return (
		<>
			<div className="anime-card-today my-[40px]">
				<div className="center-title mb-[20px]">
					<h1 className="anime-top-day font-black">XEM NHIỀU TRONG NGÀY</h1>
				</div>
				<CardGroup>
					<MostWatched rankToday={rankToday} done2={done2} />
				</CardGroup>
			</div>
		</>
	)
}

export default MostWatchVI
