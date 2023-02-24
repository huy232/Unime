import React, { useEffect, useState } from "react"
import axios from "axios"
import quotes from "../../../Utilities/quotes.json"
import { API } from "../../../constants"

function AnimeRandomQuote() {
	const [quoteData, setQuoteData] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getRandomQuote = () => setLoading(true)
		axios
			.get(`${API}/quote`, {
				cancelToken: source.token,
			})
			.then((data) => {
				if (data.data.success === true) {
					setQuoteData(data.data.data)
				} else {
					const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
					setQuoteData(randomQuote)
				}
				setLoading(false)
			})
			.catch((thrown) => {
				const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
				setQuoteData(randomQuote)
				setLoading(false)
				if (axios.isCancel(thrown)) return
			})
		getRandomQuote()
		return () => {
			source.cancel()
		}
	}, [])

	return (
		<div className="quote-container max-sm:hidden">
			{!loading && (
				<>
					<h2 className="quote-heading">QUOTE:</h2>
					<div className="quote-holder">
						<div className="quote">
							<p className="quote-paragraph">&quot;{quoteData.quote}&quot;</p>
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
