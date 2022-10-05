import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
import useDocumentTitle from "../DocumentTitleHook"
import "./search.css"

function Search({ instance }) {
	const { searchSlug } = useParams()

	const [searchData, setSearchData] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getSearch = async () => {
			await instance
				.get(`/search?q=${searchSlug}`, {
					cancelToken: source.token,
				})
				.then((data) => setSearchData(data.data.data))
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
				<h1 style={{ display: "inline-block" }}>TÌM KIẾM</h1>
			</div>
			<Row xs={1} sm={2} md={3} lg={4} className="search-anime-row">
				{searchData.map((anime) => (
					<Col key={anime.slug}>
						<nav>
							<Link to={`/info/${anime.slug}`}>
								<Card>
									<div className="card-container">
										<Card.Img
											variant="top"
											src={anime.thumbnail}
											fluid="true"
										/>
										<div className="overlay-card">
											<div className="icon">{<BsFillPlayFill size={40} />}</div>
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
						<div className="w-100"></div>
					</Col>
				))}
			</Row>
		</>
	)
}

export default Search
