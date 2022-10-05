import { useEffect } from "react"

function useDocumentTitle(title, prevailOnUnmount = false) {
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
