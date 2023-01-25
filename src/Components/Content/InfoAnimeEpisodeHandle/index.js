import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"

// STORE
// &episode=${(selectedChunk + 1) * 12 - (12 - i - 1)}

function InfoAnimeEpisodeHandle({
	anime,
	info,
	episodeList,
	selectedChunk,
	loading,
}) {
	return (
		<>
			{loading ? (
				""
			) : (
				<div className="episode-wrapper mb-[20px]">
					<div className="episode-list-detail">
						<Row
							xs={1}
							sm={2}
							md={3}
							lg={4}
							className="w-100 g-4 episode-anime-row"
						>
							{episodeList[selectedChunk]?.map((eachEpisode, i) => (
								<Col key={i}>
									<nav>
										{
											<Link
												to={`/watch/${anime}?index=${eachEpisode.name}`}
												title={eachEpisode?.full_name}
											>
												<Card>
													<div className="card-container">
														<Card.Img
															variant="top"
															src={
																eachEpisode?.thumbnail_medium ||
																eachEpisode?.thumbnail_small
															}
														/>
														<div className="overlay-card">
															<div className="icon">
																{<BsFillPlayFill size={40} />}
															</div>
														</div>
													</div>
													<Card.Body>
														<Card.Title>
															{eachEpisode?.full_name === "Trailer" ? (
																"Movie"
															) : (
																<p className="webclamp">
																	{eachEpisode?.full_name}
																</p>
															)}
														</Card.Title>
													</Card.Body>
												</Card>
											</Link>
										}
									</nav>
								</Col>
							))}
						</Row>
					</div>
				</div>
			)}
		</>
	)
}

export default InfoAnimeEpisodeHandle
