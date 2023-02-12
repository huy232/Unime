import "./recentepisode.css"
import AnimeSkeletonENG from "../AnimeSkeletonENG"
import RecentAnimeENGComp from "../RecentAnimeENGComp"

function RecentEpisodeENG({ loadingRecentAnime, recentAnime }) {
	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-lime-300 max-sm:text-center">
				NEWLY UPDATED
			</h1>
			{loadingRecentAnime ? (
				<AnimeSkeletonENG />
			) : (
				<RecentAnimeENGComp recentAnime={recentAnime} />
			)}
		</div>
	)
}

export default RecentEpisodeENG
