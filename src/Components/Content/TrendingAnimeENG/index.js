import "./popularanime.css"
import AnimeSkeleton from "../AnimeSkeleton"
import TrendingAnimeENGComp from "../TrendingAnimeENGComp"

function TrendingAnimeENG({ loadingTrending, trendingAnime }) {
	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-right text-violet-500 max-sm:text-center">
				TRENDING
			</h1>
			{loadingTrending ? (
				<AnimeSkeleton />
			) : (
				<TrendingAnimeENGComp trendingAnime={trendingAnime} />
			)}
		</div>
	)
}

export default TrendingAnimeENG
