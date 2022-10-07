import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import ShowMoreText from "react-show-more-text"
import DescriptionSkeleton from "../DescriptionSkeleton"

function RandomAnimeTitle({ randomAnime }) {
	return (
		<>
			<Card>
				<Card.Title className="description-title">
					{!randomAnime?.AnimeName ? (
						<DescriptionSkeleton />
					) : (
						randomAnime?.AnimeName?.todayTitle
					)}
				</Card.Title>
				{!randomAnime?.BannerImg ? (
					""
				) : (
					<nav>
						<Link to={`/info/${randomAnime?.Slug}`}>
							<Card.Img
								className="today-banner-card-image"
								variant="bottom"
								src={randomAnime?.BannerImg}
								style={{
									height: "400px",
									objectFit: "cover",
								}}
							/>
						</Link>
					</nav>
				)}

				<Card.Body className="description-card">
					{!randomAnime?.Description ||
					randomAnime?.Description.trim() === "" ? (
						<DescriptionSkeleton />
					) : (
						<ShowMoreText
							lines={2}
							more="Hiện thêm"
							less="Rút gọn"
							className="content-css"
							anchorClass="my-anchor-css-class"
							expanded={false}
							truncatedEndingComponent={"..."}
						>
							<Card.Text>{randomAnime?.Description.trim()}</Card.Text>
						</ShowMoreText>
					)}
				</Card.Body>

				<Card.Footer
					style={{
						display: "flex",
						alignItems: "center",
						width: "100%",
						maxWidth: "100%",
					}}
				>
					<span className="studio-text">
						{!randomAnime?.Studio ? (
							<DescriptionSkeleton />
						) : (
							<>
								<span style={{ fontWeight: "700" }}>Studio:</span>{" "}
								{randomAnime?.Studio}
							</>
						)}
					</span>
				</Card.Footer>
			</Card>
		</>
	)
}

export default RandomAnimeTitle
