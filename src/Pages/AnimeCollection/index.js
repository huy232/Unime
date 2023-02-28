import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { COLLECTIONS } from "../../constants"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import LoadingSpin from "react-loading-spin"

function AnimeCollection({ instance }) {
	const { collection } = useParams()

	const [animeList, setAnimeList] = useState([])
	const [collectionAnime, setCollectionAnime] = useState("")
	const [translateGenreAnime, setTranslateGenreAnime] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const translateCollection = () => {
			for (let i = 0; i < COLLECTIONS.length; i++) {
				if (collectionAnime === COLLECTIONS[i].slug) {
					setTranslateGenreAnime(COLLECTIONS[i].name)
				}
			}
		}

		if (collection === collectionAnime) {
			const getList = async () => {
				setLoading(true)
				await instance
					.get(`/collection/${collection}`, {
						cancelToken: source.token,
					})
					.then((response) => {
						const newList = response.data.data.map((anime) => ({
							slug: anime.slug,
							thumbnail: anime.thumbnail,
							name: anime.name,
							views: anime.views,
						}))
						setAnimeList((prev) => {
							return [...new Set([...prev, ...newList])]
						})
						setLoading(false)
					})
					.catch((thrown) => {
						if (axios.isCancel(thrown)) return
					})
			}

			getList()
			translateCollection()
		} else {
			setAnimeList([])
			setCollectionAnime(collection)
		}

		return () => {
			source.cancel()
		}
	}, [collection, collectionAnime, instance])

	return (
		<>
			<div>
				<h1 className="font-black">{translateGenreAnime}</h1>
				{useDocumentTitle(`${translateGenreAnime} - Unime`)}
			</div>

			<div className="anime-list pb-12 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
				{loading ? (
					<div className="loading-spin">
						<LoadingSpin primaryColor="red" />
					</div>
				) : (
					<Row
						xs={1}
						sm={2}
						md={3}
						lg={4}
						className="w-full w-full row-anime pb-12 md:px-8 lg:px-16 xl:px-24 2xl:px-32"
					>
						{animeList.map((anime) => (
							<Col key={anime?.slug}>
								<nav>
									<Link
										to={`/info/${anime?.slug}`}
										title={anime?.name}
										aria-label={anime?.name}
									>
										<Card>
											<div className="card-container">
												<Card.Img
													variant="top"
													src={anime?.thumbnail}
													fluid="true"
													loading="lazy"
													alt={anime?.name}
												/>
												<div className="overlay-card">
													<div className="icon">
														{<BsFillPlayFill size={40} />}
													</div>
												</div>
											</div>
											<Card.Body>
												<Card.Title>
													<p className="webclamp">{anime?.name}</p>
												</Card.Title>
											</Card.Body>
										</Card>
									</Link>
								</nav>
								<div className="w-full"></div>
							</Col>
						))}
					</Row>
				)}
			</div>
		</>
	)
}

export default AnimeCollection
