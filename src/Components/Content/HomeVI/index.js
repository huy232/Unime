import React from "react"
import LazyLoad from "react-lazyload"
// COMPONENTS
import RandomAnime from "../RandomAnime"
import RecentAnimeVI from "../RecentAnimeVI"
import MostWatchVI from "../MostWatchVI"
import CollectionsVI from "../CollectionsVI"
import "./home.css"

function HomeVI({ instance }) {
	return (
		<>
			<LazyLoad>
				<RecentAnimeVI instance={instance} />
			</LazyLoad>
			<LazyLoad>
				<MostWatchVI instance={instance} />
			</LazyLoad>
			<LazyLoad>
				<CollectionsVI />
			</LazyLoad>
			<LazyLoad>
				<RandomAnime instance={instance} />
			</LazyLoad>
		</>
	)
}

export default HomeVI
