import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function AnimeInfo({ instance }) {
	const { anime } = useParams()

	const [info, setInfo] = useState({})

	useEffect(() => {
		window.scrollTo(0, 0)
		window.history.scrollRestoration = "manual"

		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getList = async () => {
			await instance
				.get(`/info/${anime}`, {
					cancelToken: source.token,
				})
				.then((response) => {
					setInfo(response.data)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getList()

		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			<div>ANIME INFO</div>
			{console.log(info)}
		</>
	)
}

export default AnimeInfo
