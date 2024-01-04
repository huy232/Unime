import RandomAnimeENGComp from "../RandomAnimeENGComp"

function RandomAnimeENG({ loadingRandomAnime, randomAnime }) {
	return (
		<>
			{!loadingRandomAnime && <RandomAnimeENGComp randomAnime={randomAnime} />}
		</>
	)
}

export default RandomAnimeENG
