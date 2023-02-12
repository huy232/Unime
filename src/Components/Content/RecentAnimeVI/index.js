import React, { useState, useEffect } from "react"
import axios from "axios"
import { CardGroup } from "react-bootstrap"
import NewAnime from "../NewAnime"

function RecentAnimeVI({ instance }) {
	const [newAnime, setNewAnime] = useState([])
	const [done1, setDone1] = useState(false)

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
			<div className="anime-card mt-[6px]">
				<h1 className="anime-newest font-black inline-block mb-[20px]">
					MỚI NHẤT
				</h1>
				<CardGroup>
					<NewAnime newAnime={newAnime} done1={done1} />
				</CardGroup>
			</div>
		</>
	)
}

export default RecentAnimeVI
