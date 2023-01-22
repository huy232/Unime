import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { API } from "../../../constants"
import AnimeInfoBannerENG from "../AnimeInfoBannerENG"
import AnimeInfoBoxENG from "../AnimeInfoBoxENG"
import AnimeInfoDetailENG from "../AnimeInfoDetailENG"

function AnimeInfoENG() {
	const [info, setInfo] = useState({})
	const [loading, setLoading] = useState(true)

	const { animeId } = useParams()
	useEffect(() => {
		const getInfo = async () => {
			const data = await axios.get(`${API}/eng/info/${animeId}`)
			setInfo(data.data.data)
			setLoading(false)
		}

		getInfo()
	}, [animeId])
	return (
		<div>
			<AnimeInfoBannerENG loading={loading} info={info.anilist} />
			<div className="w-100 flex relative">
				<AnimeInfoBoxENG loading={loading} info={info} />
				<AnimeInfoDetailENG loading={loading} info={info} />
			</div>
		</div>
	)
}

export default AnimeInfoENG
