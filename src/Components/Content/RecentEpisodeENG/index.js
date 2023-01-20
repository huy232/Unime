import React, { useEffect, useState } from "react"
import axios from "axios"
import { RECENT_ANIME } from "../../../constants"

function RecentEpisodeENG() {
	const [recentAnime, setRecentAnime] = useState([])

	useEffect(() => {
		const getRecentAnime = async () => {
			const getRecentData = await axios.get(RECENT_ANIME)
			setRecentAnime(getRecentData.data.results)
		}

		getRecentAnime()
	}, [])

	return <div>{recentAnime.map((anime) => {})}</div>
}

export default RecentEpisodeENG
