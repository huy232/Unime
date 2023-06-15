export function dateConvert(dateString) {
	const date = new Date(dateString)
	const formattedDate = date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
	return formattedDate
}
