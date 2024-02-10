import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import ClampedDiv from "../Description"

function RandomAnimeTitle({ randomAnime }) {
	return (
		<>
			<Card>
				<Link
					to={`/info/${randomAnime.slug}`}
					aria-label={randomAnime.slug}
					className="hover:opacity-70 duration-200 ease-linear"
				>
					<Card.Title
						className="description-title"
						style={{ color: `${randomAnime.cover.color || "#ffc"}` }}
					>
						{randomAnime.title.romaji ||
							randomAnime.title.english ||
							randomAnime.name ||
							randomAnime.title.userPreferred}
					</Card.Title>
				</Link>
				{randomAnime?.banner && (
					<nav className="random-anime">
						<Link
							to={`/info/${randomAnime.slug}`}
							aria-label={randomAnime.slug}
						>
							<Card.Img
								className="today-banner-card-image object-cover hover:opacity-80"
								variant="bottom"
								src={randomAnime.banner}
								alt={randomAnime.name}
								loading="lazy"
								style={{
									opacity: 0,
									transition: "opacity 0.5s ease-in-out",
								}}
								onLoad={(e) => {
									e.target.style.opacity = 1
								}}
							/>
						</Link>
					</nav>
				)}

				<Card.Body className="description-card h-100 text-left text-md">
					<ClampedDiv>{randomAnime?.description}</ClampedDiv>
				</Card.Body>
				<Card.Footer className="flex items-center w-full">
					<span className="studio-text text-sm">
						{randomAnime?.studio && (
							<div className="flex gap-2">
								<span style={{ fontWeight: "700" }}>Studio: </span>
								<div className="text-left text-gray-300">
									{randomAnime.studio}
								</div>
							</div>
						)}
					</span>
				</Card.Footer>
			</Card>
		</>
	)
}

export default RandomAnimeTitle
