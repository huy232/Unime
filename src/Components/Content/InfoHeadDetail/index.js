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
						{info?.description && (
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
			<div className="group flex md:flex-wrap hover:opacity-80 duration-200 ease-in-out max-md:overflow-x-scroll max-md:flex-nowrap">
				{!loading &&
					resultCategory.map((genre) => (
						<div
							className="group-hover:hover:text-[#f98866] m-[8px] rounded-[14px] bg-[#5f5f5f29] mx-[10px] max-md:shrink-0"
							key={genre.slug}
						>
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
			<div className="group flex md:flex-wrap hover:opacity-80 duration-200 ease-in-out max-md:overflow-x-scroll max-md:flex-nowrap">
				{!loading &&
					resultCollection.map((collection) => (
						<div
							className="group-hover:hover:text-[#f98866] m-[8px] rounded-[14px] bg-[#5f5f5f29] mx-[10px] max-md:shrink-0"
							key={collection.slug}
						>
							<Link
								to={`/collection/${collection.slug}`}
								className="anime__slug"
							>
								<div className="genre-name">{collection.name}</div>
							</Link>
						</div>
					))}
			</div>

			<div className="flex flex-row my-[10px] max-md:overflow-x-scroll md:justify-center md:items-center mt-1">
				{!!info?.countryOfOrigin && (
					<div className="flex flex-col my-[10px] items-center px-1 max-md:shrink-0">
						<h6 className="bg-[#f98866] font-bold rounded-[10px] text-[#282828] p-[4px] inline-block">
							QUỐC GIA
						</h6>
						<div className="country-element">{`${info.countryOfOrigin}`}</div>
					</div>
				)}
				{!!info?.averageScore && (
					<div className="flex flex-col my-[10px] items-center px-1 max-md:shrink-0">
						<h6 className="bg-[#ff420e] font-bold rounded-[10px] text-[#282828] p-[4px] inline-block">
							ĐIỂM SỐ
						</h6>
						<div className="score-element">{info.averageScore}</div>
					</div>
				)}
				{!!info?.duration && (
					<div className="flex flex-col my-[10px] items-center px-1 max-md:shrink-0">
						<h6 className="bg-[#80bd9e] font-bold rounded-[10px] text-[#282828] p-[4px] inline-block">
							THỜI LƯỢNG
						</h6>
						<div className="duration-element">{`${info.duration} phút`}</div>
					</div>
				)}
				{!!info?.views && (
					<div className="flex flex-col my-[10px] items-center px-1 max-md:shrink-0">
						<h6 className="bg-[#89da59] font-bold rounded-[10px] text-[#282828] p-[4px] inline-block">
							LƯỢT XEM
						</h6>
						<div className="views-element">{info?.views.toLocaleString()}</div>
					</div>
				)}
				{info?.startDate?.year && (
					<div className="flex flex-col my-[10px] items-center px-1 max-md:shrink-0 ml-auto md:mr-[24px] order-last">
						<h6 className="bg-[#ba5536] font-bold rounded-[10px] text-[#282828] p-[4px] inline-block">
							KHỞI CHIẾU
						</h6>
						<div className="release-date-element">{info.startDate.year}</div>
					</div>
				)}
			</div>
		</>
	)
}

export default InfoHeadDetail
