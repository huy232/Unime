import { CardGroup } from "react-bootstrap"
import NewAnime from "../NewAnime"

function RecentAnimeVI({ newAnime, loadingNewAnime }) {
	return (
		<>
			<div className="anime-card mt-[6px]">
				<h1 className="anime-newest font-black inline-block mb-[20px]">
					MỚI NHẤT
				</h1>
				<CardGroup className="px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36">
					<NewAnime newAnime={newAnime} loadingNewAnime={loadingNewAnime} />
				</CardGroup>
			</div>
		</>
	)
}

export default RecentAnimeVI
