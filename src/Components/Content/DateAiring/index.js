import React from "react"

function DateAiring({ time, timeZone }) {
	return (
		<p>
			{new Date(time.airingTime * 1000)
				.toLocaleString("en-US", {
					timeZone: `${timeZone}`,
				})
				.toString()}
		</p>
	)
}

export default DateAiring
