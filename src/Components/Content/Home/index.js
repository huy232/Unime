// COMPONENTS
import loadable from "@loadable/component"
import { CardGroup } from "react-bootstrap"
import "./home.css"
import useDocumentTitle from "../DocumentTitleHook"
const NewAnime = loadable(() => import("../NewAnime"))
const MostWatched = loadable(() => import("../MostWatched"))
const RandomAnime = loadable(() => import("../RandomAnime"))

function Home({ instance }) {
	useDocumentTitle("Trang chủ - Unime")

	return (
		<>
			<div className="anime-card" style={{ marginTop: "42px" }}>
				<h1
					className="anime-h1"
					style={{ marginBottom: "42px", width: "200px" }}
				>
					MỚI NHẤT
				</h1>
				<CardGroup>
					<NewAnime instance={instance} />
				</CardGroup>
			</div>

			<div className="anime-card-today" style={{ marginTop: "42px" }}>
				<div className="center-title">
					<h1 className="anime-top-day-h1" style={{ marginBottom: "42px" }}>
						XEM NHIỀU TRONG NGÀY
					</h1>
				</div>
				<CardGroup>
					<MostWatched instance={instance} />
				</CardGroup>
			</div>

			<RandomAnime instance={instance} />
		</>
	)
}

export default Home
