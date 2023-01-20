import React from "react"
import { useEffect, useState } from "react"
import { ReactNetflixPlayer } from "react-netflix-player"
import { useNavigate } from "react-router-dom"

function NetflixPlayer({
	anime,
	src,
	info,
	index,
	watchDetail,
	filmName,
	episodeName,
}) {
	const [list, setList] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		let mounted = true
		if (mounted) {
			setList(
				info.map((episode) => ({
					id: episode.name,
					playing: index == episode.name ? true : false,
					nome: episode.full_name,
				}))
			)
		}
		return () => {
			mounted = false
		}
	}, [index, info])

	return (
		<>
			{list.length > 0 && (
				<>
					<ReactNetflixPlayer
						key={src}
						title={filmName}
						titleMedia={filmName}
						subTitle={episodeName}
						extraInfoMedia={episodeName}
						src={src}
						fullPlayer={true}
						backButton={() => navigate(`/info/${anime}`)}
						playbackRateEnable={true}
						playbackRateOptions={[
							"0.25",
							"0.5",
							"0.75",
							"Normal",
							"1.25",
							"1.5",
							"2",
						]}
						overlayEnabled={true}
						autoControlCloseEnabled={true}
						playerLanguage={"en"}
						reprodutionList={list}
						onClickItemListReproduction={(id) => {
							navigate(`/watch/${anime}?index=${id}`)
						}}
					/>
				</>
			)}
		</>
	)
}

export default NetflixPlayer
