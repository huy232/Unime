import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import LoadingSpin from "react-loading-spin"
import "./search.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

function Search({ instance }) {
	const { searchSlug } = useParams()

	const [searchData, setSearchData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getSearch = async () => {
			setLoading(true)
			await instance
				.get(`/search?q=${searchSlug}`, {
					cancelToken: source.token,
				})
				.then((data) => {
					setSearchData(data.data.data)
					setLoading(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getSearch()

		return () => {
			source.cancel()
		}
	}, [instance, searchSlug])

	useDocumentTitle(`Tìm kiếm`)

	return (
		<>
			<div
				className="title-wrapper"
				style={{ textAlign: "left", margin: "20px 0" }}
			>
				<h1 className="inline-block font-black">TÌM KIẾM</h1>
			</div>
			<Row
				xs={1}
				sm={2}
				md={3}
				lg={4}
				className="search-anime-row pb-12 md:px-8 lg:px-16 xl:px-24 2xl:px-32"
			>
				{loading ? (
					<div className="loading-spin">
						<LoadingSpin primaryColor="red" />
					</div>
				) : searchData.length === 0 ? (
					<div className="search-result">
						<p>Không có kết quả khớp với tìm kiếm</p>
					</div>
				) : (
					searchData.map((anime) => (
						<Col key={anime.slug}>
							<nav>
								<Link to={`/info/${anime.slug}`} aria-label={anime.slug}>
									<Card>
										<div className="card-container">
											<Card.Img
												variant="top"
												src={anime.thumbnail}
												fluid="true"
												loading="lazy"
												alt={anime?.name}
											/>
											{anime?.views && (
												<p className="text-[#fffc] top-0 right-0 bg-[#0d0d0d]/[0.8] flex items-center rounded-[2px] m-[4px] p-[4px] absolute">
													<FontAwesomeIcon
														icon={faEye}
														className="pr-[2px] h-[14px] w-[14px] mt-[2px]"
													/>
													{anime.views.toLocaleString()} lượt xem
												</p>
											)}
											<div className="overlay-card">
												<div className="icon">
													{<BsFillPlayFill size={40} />}
												</div>
											</div>
										</div>
										<Card.Body className="h-[150px]">
											<Card.Title>
												<div className="h-[70px]">
													<p className="webclamp text-orange-50 font-semibold">
														{anime?.name}
													</p>
												</div>
											</Card.Title>
											<p className="text-[#fffc] flex items-center rounded-[2px] m-[4px]">
												{anime.animeFormat}
											</p>
										</Card.Body>
									</Card>
								</Link>
							</nav>
							<div className="w-full"></div>
						</Col>
					))
				)}
			</Row>
		</>
	)
}

export default Search
