export function duration(num) {
	var hours = Math.floor(num / 60)
	var minutes = num % 60
	if (hours) {
		return `${hours + "h " + minutes + "m"}`
	}
	return `${minutes + "m"}`
}
