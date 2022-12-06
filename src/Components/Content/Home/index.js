import { useState } from "react"
import { CardGroup } from "react-bootstrap"
import useDocumentTitle from "../DocumentTitleHook"
import LoadingBar from "react-top-loading-bar"
import { Helmet } from "react-helmet-async"
import { MAINSITE } from "../../../constants"
// COMPONENTS
import NewAnime from "../NewAnime"
import MostWatched from "../MostWatched"
import AnimeCollectionCard from "../AnimeCollectionCard"
import RandomAnime from "../RandomAnime"
import "./home.css"

function Home({ instance }) {
	const [progress, setProgress] = useState(0)

	useDocumentTitle("Trang chủ - Unime")

	return (
		<>
			<Helmet>
				<title>{`Trang chủ - Unime`}</title>
				<link rel="canonical" href={`${MAINSITE}`} />
				<meta property="og:title" content={`Trang chủ - Unime`} />
				<meta
					property="og:description"
					content="Trang chủ của Anime, website xem phim hoàn toàn miễn phí."
				/>
			</Helmet>

			<LoadingBar
				color="#f11946"
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className="anime-card" style={{ marginTop: "42px" }}>
				<h2
					className="anime-h1"
					style={{ marginBottom: "42px", width: "200px" }}
				>
					MỚI NHẤT
				</h2>
				<CardGroup>
					<NewAnime instance={instance} />
				</CardGroup>
			</div>
			<div className="anime-card-today" style={{ marginTop: "42px" }}>
				<div className="center-title">
					<h2 className="anime-top-day-h2" style={{ marginBottom: "42px" }}>
						XEM NHIỀU TRONG NGÀY
					</h2>
				</div>
				<CardGroup>
					<MostWatched instance={instance} />
				</CardGroup>
			</div>
			<div className="anime-collection" style={{ marginTop: "42px" }}>
				<div className="center-title">
					<div className="anime-collection-titleholder">
						<h2
							className="anime-collection-h2"
							style={{ marginBottom: "42px" }}
						>
							BỘ SƯU TẬP
						</h2>
					</div>
					<AnimeCollectionCard />
				</div>
			</div>
			<RandomAnime instance={instance} />
		</>
	)
}

export default Home
