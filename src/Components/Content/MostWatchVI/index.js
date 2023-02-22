import React from "react"
import { CardGroup } from "react-bootstrap"
import MostWatched from "../MostWatched"

function MostWatchVI({ rankToday, done2 }) {
	return (
		<>
			<div className="anime-card-today my-[40px] px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36">
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
