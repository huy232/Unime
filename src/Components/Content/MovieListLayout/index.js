import React from "react"
import AnimeSkeleton from "../AnimeSkeleton"
import ListComp from "../ListComp"
import "./movielistlayout.css"

function MovieList({ data, loading }) {
	return (
		<div>
			<div className="movie-heading-wrapper pb-4 text-center">
				<h1 className="movie-heading font-black inline-block">MOVIES</h1>
			</div>
			{!loading ? <AnimeSkeleton /> : <ListComp data={data} />}
		</div>
	)
}

export default MovieList
