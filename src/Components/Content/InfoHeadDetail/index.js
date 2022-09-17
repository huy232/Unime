import DescriptionSkeleton from "../DescriptionSkeleton"
function InfoHeadDetail({ info, loading }) {
	return (
		<>
			<div className="anime-title">
				<h2 style={{ color: `${info?.animeInfo?.CoverImg?.color}` }}>
					{loading ? <DescriptionSkeleton /> : info?.name}
				</h2>
			</div>
			<div className="description">
				<p>
					{loading ? (
						<DescriptionSkeleton />
					) : !info?.description ? (
						""
					) : (
						`${info?.description}`
					)}
				</p>
			</div>
			<div className="bottom-detail" style={{ marginTop: "50px" }}>
				<div className="country">
					<h6>QUỐC GIA</h6>{" "}
					<div className="country-element">
						{!info?.animeInfo?.Country ? "" : `${info?.animeInfo?.Country}`}
					</div>
				</div>
				<div className="score">
					<h6>ĐIỂM SỐ</h6>{" "}
					<div className="score-element">{info?.animeInfo?.Score}</div>
				</div>
				<div className="duration">
					<h6>THỜI LƯỢNG</h6>
					<div className="duration-element">
						{!info?.animeInfo?.Duration
							? ""
							: `${info?.animeInfo?.Duration} phút`}
					</div>
				</div>
				<div className="views">
					<h6>LƯỢT XEM</h6>
					<div className="views-element">{info?.views?.toLocaleString()}</div>
				</div>
				<div className="release-date">
					<h6>KHỞI CHIẾU</h6>
					<div className="release-date-element">
						{!info?.animeInfo?.StartDate?.day
							? ""
							: `Ngày ${info?.animeInfo?.StartDate?.day} `}
						{!info?.animeInfo?.StartDate?.month
							? ""
							: `Tháng ${info?.animeInfo?.StartDate?.month} `}
						{!info?.animeInfo?.StartDate?.year
							? ""
							: `Năm ${info?.animeInfo?.StartDate?.year}`}
					</div>
				</div>
			</div>
		</>
	)
}

export default InfoHeadDetail
