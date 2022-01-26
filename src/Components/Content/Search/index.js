import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import { debounce } from "../../../Utilities/debounce"
import TextTruncate from "react-text-truncate"
import Skeleton from "@mui/material/Skeleton"
import { BsFillPlayFill } from "react-icons/bs"

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
	}, [searchSlug])
	return (
		<>
			<Row xs={1} sm={2} md={3} lg={4}>
				{searchData.map((anime) => (
					<Col key={anime.slug}>
						<Card>
							<div className="card-container">
								<Card.Img variant="top" src={anime.thumbnail} fluid="true" />
								<div className="overlay-card">
									<a className="icon">{<BsFillPlayFill size={40} />}</a>
								</div>
							</div>
							<Card.Body>
								<Card.Title>
									<TextTruncate
										line={2}
										element="span"
										truncateText="…"
										text={anime?.name}
									/>
								</Card.Title>
							</Card.Body>
						</Card>
						<div className="w-100"></div>
					</Col>
				))}
			</Row>
		</>
	)
}

export default Search
