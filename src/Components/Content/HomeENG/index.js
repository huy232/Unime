import React from "react"
import RecentEpisodeENG from "../RecentEpisodeENG"
import TopAiringENG from "../TopAiringENG"
import useDocumentTitle from "../DocumentTitleHook"
import TrendingAnimeENG from "../TrendingAnimeENG"
import RandomAnimeENG from "../RandomAnimeENG"
import AiringScheduleENG from "../AiringScheduleENG"
import LazyLoad from "react-lazyload"

function HomeENG() {
	useDocumentTitle(`HOME - Unime`)
	return (
		<>
			<LazyLoad>
				<TopAiringENG />
			</LazyLoad>
			<LazyLoad>
				<RecentEpisodeENG />
			</LazyLoad>
			<LazyLoad>
				<TrendingAnimeENG />
			</LazyLoad>
			<LazyLoad>
				<AiringScheduleENG />
			</LazyLoad>
			<LazyLoad>
				<RandomAnimeENG />
			</LazyLoad>
		</>
	)
}

export default HomeENG
