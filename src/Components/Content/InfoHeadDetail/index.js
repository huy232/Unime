import DescriptionSkeleton from "../DescriptionSkeleton"
import { GENRES, COLLECTIONS } from "../../../constants"
import { Link } from "react-router-dom"
import ClampedDiv from "../Description"

function InfoHeadDetail({ info, loading }) {
	let resultCollection = COLLECTIONS.filter((collection) => {
		if (info && Object.keys(info).length !== 0) {
			return info.genres.find(
				(selectedCollection) => selectedCollection.slug === collection.slug
			)
		}
	})

	let resultCategory = GENRES.filter((genre) => {
		if (info && Object.keys(info).length !== 0) {
			return info.genres.find(
				(selectedGenre) => selectedGenre.name === genre.name
			)
		}
	})
	return (
		<>
			<div className="anime-title">
				<h2
					className="font-black"
					style={{ color: `${info.coverImage?.color}` }}
				>
					{loading ? <DescriptionSkeleton /> : info?.name}
				</h2>
			</div>
			<div className="description">
				{loading ? (
					<DescriptionSkeleton />
				) : (
					<>
						{info.description.trim() && (
							<div className="anime-description-paragraph">
								<ClampedDiv>{info.description}</ClampedDiv>
							</div>
						)}
					</>
				)}
			</div>
			{resultCategory?.length > 0 && (
				<p className="anime-type-paragraph">Thể loại:</p>
			)}
			<div className="anime-type-category flex-wrap">
				{!loading &&
					resultCategory.map((genre) => (
						<div className="category-genre m-[8px]" key={genre.slug}>
							<Link
								to={`/anime/${genre.slug}`}
								className="anime__slug"
								aria-label={genre.name}
							>
								<div className="genre-name">{genre.name}</div>
							</Link>
						</div>
					))}
			</div>
			{resultCollection?.length > 0 && (
				<p className="anime-type-paragraph">Bộ sưu tập:</p>
			)}
			<div className="anime-type-collection flex-wrap">
				{!loading &&
					resultCollection.map((collection) => (
						<div className="category-genre m-[8px]" key={collection.slug}>
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
					<h6>QUỐC GIA</h6>
					<div className="country-element">
						{info?.countryOfOrigin && `${info.countryOfOrigin}`}
					</div>
				</div>
				<div className="score">
					<h6>ĐIỂM SỐ</h6>
					<div className="score-element">{info?.averageScore}</div>
				</div>
				<div className="duration">
					<h6>THỜI LƯỢNG</h6>
					<div className="duration-element">
						{info?.duration && `${info.duration} phút`}
					</div>
				</div>
				<div className="views">
					<h6>LƯỢT XEM</h6>
					<div className="views-element">{info?.views?.toLocaleString()}</div>
				</div>
				<div className="release-date">
					<h6>KHỞI CHIẾU</h6>
					<div className="release-date-element">
						{info?.startDate?.year && info.startDate.year}
					</div>
				</div>
			</div>
		</>
	)
}

export default InfoHeadDetail
