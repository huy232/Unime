import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import DescriptionSkeleton from "../DescriptionSkeleton"
import { useState } from "react"
import useIsTruncated from "../../../Hooks/useIsTruncated"
import { useRef } from "react"

function RandomAnimeTitle({ randomAnime }) {
	const ref = useRef(null)
	const isTruncated = useIsTruncated(ref)
	const [showMore, setShowMore] = useState(isTruncated)
	return (
		<>
			<Card>
				<Card.Title className="description-title">
					{randomAnime.name}
				</Card.Title>
				{randomAnime?.banner && (
					<nav>
						<Link
							to={`/info/${randomAnime.slug}`}
							aria-label={randomAnime.slug}
						>
							<Card.Img
								className="today-banner-card-image object-cover"
								variant="bottom"
								src={randomAnime.banner}
								alt={randomAnime.name}
								loading="lazy"
							/>
						</Link>
					</nav>
				)}

				<Card.Body className="description-card h-100 text-left">
					{
						<div
							className={`${
								showMore ? "line-clamp-none h-fit" : "line-clamp-5"
							}`}
							dangerouslySetInnerHTML={{ __html: randomAnime?.description }}
							ref={ref}
						/>
					}
					{isTruncated && (
						<button
							className="p-2 bg-black/80 my-2 flex ml-auto hover:opacity-80 duration-200"
							onClick={() => setShowMore(!showMore)}
						>
							{showMore ? "Rút gọn" : "Hiện thêm"}
						</button>
					)}
				</Card.Body>
				<Card.Footer className="flex items-center w-full">
					<span className="studio-text">
						{!randomAnime?.studio ? (
							<DescriptionSkeleton />
						) : (
							<>
								<span style={{ fontWeight: "700" }}>Studio: </span>
								{randomAnime.studio}
							</>
						)}
					</span>
				</Card.Footer>
			</Card>
		</>
	)
}

export default RandomAnimeTitle
