import { BsStopwatchFill, BsTv } from "react-icons/bs"
import DescriptionSkeleton from "../DescriptionSkeleton"

function RandomAnimeInfo({ randomAnime }) {
	return (
		<>
			<div className="wrapper">
				<div
					className="info-today float-right flex flex-col items-end"
					style={{
						boxShadow: "-5px 5px 0px 2px #761515",
					}}
				>
					<div className="episode-time inline-flex flex-row items-center">
						{!randomAnime?.duration ? (
							<>
								<BsStopwatchFill />: ??? phút/ tập
							</>
						) : (
							<>
								<BsStopwatchFill />: ~{randomAnime.duration} phút/ tập
							</>
						)}
					</div>
					<div className="episodes-today inline-flex flex-row items-center">
						{!randomAnime?.total ? (
							<>
								<BsTv />: ??? tập
							</>
						) : (
							<>
								<BsTv />: {randomAnime.total} tập
							</>
						)}
					</div>
				</div>

				<div
					className="release-date inline-block float-right clear-right color-[#000] text-right w-[150px] mt-[20px] bg-[#290149] p-[10px]"
					style={{
						boxShadow: "-5px 5px 0px 2px #A9333A",
					}}
				>
					{!randomAnime?.end ? (
						<DescriptionSkeleton />
					) : (
						<>
							<span className="w-full text-left text-[#000] bg-[#FFF8F3] pl-[4.5px] font-black">
								KẾT THÚC
							</span>
							<br />
							<span style={{ fontWeight: "700", color: "#FFE227" }}>NGÀY</span>
							<div className="day bg-[#3FA796] text-[#000] ml-[65%] pr-[4.5px]">
								{!randomAnime.end?.day ? "??" : randomAnime.end.day}
							</div>
							<span style={{ fontWeight: "700", color: "#FFE227" }}>THÁNG</span>
							<div className="month bg-[#8267BE] text-[#000] ml-[55%] pr-[4.5px]">
								{!randomAnime.end?.month ? "??" : randomAnime.end.month}
							</div>
							<span style={{ fontWeight: "700", color: "#FFE227" }}>NĂM</span>
							<div className="year bg-[#781D42] text-[#000] ml-[45%] pr-[4.5px]">
								{!randomAnime.end?.year ? "????" : randomAnime.end.year}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default RandomAnimeInfo
