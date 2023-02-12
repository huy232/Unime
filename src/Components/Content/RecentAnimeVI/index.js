import { CardGroup } from "react-bootstrap"
import NewAnime from "../NewAnime"

function RecentAnimeVI({ newAnime, done1 }) {
	return (
		<>
			<div className="anime-card mt-[6px]">
				<h1 className="anime-newest font-black inline-block mb-[20px]">
					MỚI NHẤT
				</h1>
				<CardGroup>
					<NewAnime newAnime={newAnime} done1={done1} />
				</CardGroup>
			</div>
		</>
	)
}

export default RecentAnimeVI
