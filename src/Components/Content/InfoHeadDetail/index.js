import DescriptionSkeleton from "../DescriptionSkeleton"
import { GENRES, COLLECTIONS } from "../../../constants"
import { Link } from "react-router-dom"

function InfoHeadDetail({ info, loading }) {
	const resultCollection = COLLECTIONS.filter((collection) => {
		if (Object.keys(info).length !== 0) {
			return info.genres.find(
				(selectedCollection) => selectedCollection.slug === collection.slug
			)
		}
	})

	const resultCategory = GENRES.filter((genre) => {
		if (Object.keys(info).length !== 0) {
			return info.genres.find(
				(selectedGenre) => selectedGenre.name === genre.name
			)
		}
	})
	return (
		<>
			<div className="anime-title">
				<h2 style={{ color: `${info?.animeInfo?.CoverImg?.color}` }}>
					{loading ? <DescriptionSkeleton /> : info?.name}
				</h2>
			</div>
			<div className="description">
				<p className="anime-description-paragraph">
					{loading ? (
						<DescriptionSkeleton />
					) : !info?.description ? (
						""
					) : (
						`${info?.description}`
					)}
				</p>
			</div>
			{resultCategory.length > 0 && (
				<p className="anime-type-paragraph">Thể loại:</p>
			)}
			<div className="anime-type-category">
				{!loading &&
					resultCategory.map((genre) => (
						<div className="category-genre" key={genre.slug}>
							<Link to={`/anime/${genre.slug}`} className="anime__slug">
								<div className="genre-name">{genre.name}</div>
							</Link>
						</div>
					))}
			</div>
			{resultCollection.length > 0 && (
				<p className="anime-type-paragraph">Bộ sưu tập:</p>
			)}
			<div className="anime-type-collection">
				{!loading &&
					resultCollection.map((collection) => (
						<div className="category-genre" key={collection.slug}>
							<Link
								to={`/collection/${collection.slug}`}
								className="anime__slug"
							>
								<div className="genre-name">{collection.name}</div>
							</Link>
						</div>
					))}
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
							: `tháng ${info?.animeInfo?.StartDate?.month} `}
						{!info?.animeInfo?.StartDate?.year
							? ""
							: `năm ${info?.animeInfo?.StartDate?.year}`}
					</div>
				</div>
			</div>
		</>
	)
}

export default InfoHeadDetail
