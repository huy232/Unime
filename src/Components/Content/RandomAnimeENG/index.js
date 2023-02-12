import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../../constants"
import RandomAnimeENGComp from "../RandomAnimeENGComp"

function RandomAnimeENG() {
	const [loadingRandomAnime, setLoadingRandomAnime] = useState(true)
	const [randomAnime, setRandomAnime] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getRandomAnime = async () => {
			await axios
				.get(`${API}/eng/random-anime`, {
					cancelToken: source.token,
				})
				.then((randomAnime) => {
					if (randomAnime.data.success === false) {
						setRandomAnime([])
						setLoadingRandomAnime(true)
					} else {
						setRandomAnime(randomAnime.data.data)
						setLoadingRandomAnime(false)
					}
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getRandomAnime()

		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			{loadingRandomAnime ? (
				""
			) : (
				<RandomAnimeENGComp randomAnime={randomAnime} />
			)}
		</>
	)
}

export default RandomAnimeENG
