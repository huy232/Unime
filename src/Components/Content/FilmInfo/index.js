import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { CONSUMET_API } from "../../../constants"

function FilmInfo() {
	const [info, setInfo] = useState({})
	const { type, filmSlug } = useParams()

	useEffect(() => {
		const getFilm = async () => {
			const { data } = await axios.get(
				`${CONSUMET_API}/movies/flixhq/info?id=${type}/${filmSlug}`
			)
			setInfo(data)
		}

		getFilm()
	}, [filmSlug, type])

	return <div></div>
}

export default FilmInfo
