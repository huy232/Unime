import React, { useEffect, useState } from "react"
import axios from "axios"

function AnimeRandomQuote() {
	const [quoteData, setQuoteData] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getRandomQuote = () => setLoading(true)
		axios
			.get("https://animechan.vercel.app/api/random", {
				cancelToken: source.token,
			})
			.then((data) => {
				setQuoteData(data.data)
				setLoading(false)
			})
			.catch((thrown) => {
				if (axios.isCancel(thrown)) return
			})
		getRandomQuote()
		return () => {
			source.cancel()
		}
	}, [])

	return (
		<div className="quote-container">
			{loading ? (
				""
			) : (
				<>
					<h2 className="quote-heading">QUOTE:</h2>
					<div className="quote-holder">
						<div className="quote">
							<p className="quote-paragraph">{quoteData.quote}</p>
						</div>
						<div className="quote-info">
							<div className="quote-character">{quoteData.character}</div>
							<div className="quote-anime">{quoteData.anime}</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default AnimeRandomQuote
