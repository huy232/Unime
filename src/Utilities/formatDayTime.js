export const formatDateTime = (timestamp) => {
	const options = {
		weekday: "long",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}

	return new Intl.DateTimeFormat("en-US", options).format(new Date(timestamp))
}
