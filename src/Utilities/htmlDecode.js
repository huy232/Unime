export function htmlDecode(content) {
	let e = document.createElement("div")
	e.innerHTML = content
	return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue
}
