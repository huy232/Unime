import { BsStopwatchFill, BsTv } from "react-icons/bs"
import loadable from "@loadable/component"
const DescriptionSkeleton = loadable(() => import("../DescriptionSkeleton"))

function RandomAnimeInfo({ randomAnime }) {
	return (
		<>
			<div className="wrapper">
				<div
					className="info-today"
					style={{
						float: "right",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						boxShadow: "-5px 5px 0px 2px #761515",
					}}
				>
					<div
						className="episode-time"
						style={{
							display: "inline-flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						{!randomAnime?.Duration ? (
							<>
								<BsStopwatchFill />: ??? phút/ tập
							</>
						) : (
							<>
								<BsStopwatchFill />: ~{randomAnime?.Duration} phút/ tập
							</>
						)}
					</div>
					<div
						className="episodes-today"
						style={{
							display: "inline-flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						{!randomAnime?.EpisodeTotal ? (
							<>
								<BsTv />: ??? tập
							</>
						) : (
							<>
								<BsTv />: {randomAnime?.EpisodeTotal} tập
							</>
						)}
					</div>
				</div>

				<div
					className="release-date"
					style={{
						display: "inline-block",
						float: "right",
						clear: "right",
						color: "black",
						textAlign: "right",
						width: "150px",
						marginTop: "20px",
						backgroundColor: "#290149",
						boxShadow: "-5px 5px 0px 2px #A9333A",
						padding: "10px",
					}}
				>
					{!randomAnime?.EndDate ? (
						<DescriptionSkeleton />
					) : (
						<>
							<span
								style={{
									width: "100%",
									textAlign: "left",
									backgroundColor: "#FFF8F3",
									paddingLeft: "4.5px",
									fontWeight: "900",
								}}
							>
								KẾT THÚC
							</span>
							<br />
							<span style={{ fontWeight: "700", color: "#FFE227" }}>NGÀY</span>
							<div
								className="day"
								style={{
									backgroundColor: "#3FA796",
									color: "black",
									marginLeft: "65%",
									paddingRight: "4.5px",
								}}
							>
								{!randomAnime?.EndDate?.day ? "??" : randomAnime?.EndDate?.day}
							</div>
							<span style={{ fontWeight: "700", color: "#FFE227" }}>THÁNG</span>
							<div
								className="month"
								style={{
									backgroundColor: "#8267BE",
									color: "black",
									marginLeft: "45%",
									paddingRight: "4.5px",
								}}
							>
								{!randomAnime?.EndDate?.month
									? "??"
									: randomAnime?.EndDate?.month}
							</div>
							<span style={{ fontWeight: "700", color: "#FFE227" }}>NĂM</span>
							<div
								className="year"
								style={{
									backgroundColor: "#781D42",
									color: "black",
									marginLeft: "25%",
									paddingRight: "4.5px",
								}}
							>
								{!randomAnime?.EndDate?.year
									? "????"
									: randomAnime?.EndDate?.year}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default RandomAnimeInfo
