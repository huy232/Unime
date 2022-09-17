import { useEffect, useState } from "react"
import RandomAnimeTitle from "../RandomAnimeTitle"
import RandomAnimeInfo from "../RandomAnimeInfo"
import CharacterDetail from "../CharacterDetail"
import RandomAnimeRightCover from "../RandomAnimeRightCover"
import axios from "axios"

function RandomAnime({ instance }) {
	const [randomAnime, setRandomAnime] = useState({})
	const [done, setDone] = useState(false)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getRandom = () => {
			instance
				.get("/today", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRandomAnime(data.data.data)
					setDone(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		getRandom()
		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			<div className="col-9 flex-mobile">
				<RandomAnimeTitle randomAnime={randomAnime} />
				<div className="info-character-wrapper" style={{ marginTop: "22px" }}>
					<RandomAnimeInfo randomAnime={randomAnime} />
					<CharacterDetail randomAnime={randomAnime} done={done} />
				</div>
			</div>
			<div className="col-3">
				<RandomAnimeRightCover randomAnime={randomAnime} />
			</div>
		</>
	)
}

export default RandomAnime
