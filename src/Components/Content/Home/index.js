// COMPONENTS
import NewAnime from "../NewAnime"
import MostWatched from "../MostWatched"
import RandomAnime from "../RandomAnime"

import { CardGroup } from "react-bootstrap"
import "./home.css"
import useDocumentTitle from "../DocumentTitleHook"

function Home({ instance }) {
	useDocumentTitle("Trang chủ - Mirai")

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
			<div className="today-section" style={{ marginTop: "42px" }}>
				<h1
					className="today-h1 "
					style={{
						marginBottom: "42px",
						float: "right",
						marginRight: "30px",
					}}
				>
					CÓ THỂ BẠN SẼ THÍCH ĐÓ
				</h1>

				<div className="clearfix"></div>
				<div className="row w-100 flex-responsive">
					<RandomAnime instance={instance} />
				</div>
			</div>
		</>
	)
}

export default Home
