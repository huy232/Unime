import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import { Skeleton } from "@mui/material"
import blackBackground from "../../../Utilities/img/black.webp"

function EpisodeHolderSkeleton() {
	return (
		<div>
			<div className="w-100 h-[60px]">
				<Skeleton height={60} />
			</div>
			<div className="episode-wrapper mb-[20px] mx-[4px]">
				<div className="episode-list-detail">
					<Row
						xs={1}
						sm={2}
						md={3}
						lg={3}
						xl={3}
						xxl={4}
						className="w-full g-4 episode-anime-row"
					>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((skeleton, i) => (
							<Col key={i}>
								<div>
									<Card>
										<div className="card-container">
											<Card.Img
												src={blackBackground}
												variant="top"
												loading="lazy"
												alt="anime-skeleton-image"
												className="aspect-video"
											/>
										</div>
										<Card.Body>
											<Card.Title>
												<Skeleton />
											</Card.Title>
										</Card.Body>
									</Card>
								</div>
							</Col>
						))}
					</Row>
				</div>
			</div>
		</div>
	)
}

export default EpisodeHolderSkeleton
