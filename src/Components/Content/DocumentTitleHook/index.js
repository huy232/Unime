import { useRef, useEffect } from "react"
import { useParams } from "react-router-dom"

function useDocumentTitle(title, prevailOnUnmount = false) {
	const defaultTitle = useRef(document.title)
	const { searchSlug } = useParams()
	useEffect(() => {
		document.title = title
	}, [title])

	useEffect(
		() => () => {
			if (!prevailOnUnmount) {
				document.title = "Đang tải"
			}
		},
		[prevailOnUnmount]
	)
}

export default useDocumentTitle
