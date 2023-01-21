import { useEffect } from "react"
import { useAuth } from "../../../Contexts/auth"

function useDocumentTitle(title, prevailOnUnmount = false) {
	const { language } = useAuth()

	useEffect(() => {
		document.title = title
	}, [title])

	useEffect(
		() => () => {
			if (!prevailOnUnmount) {
				if (language === "vi") document.title = "Đang tải"
				if (language === "en") document.title = "Loading"
			}
		},
		[language, prevailOnUnmount]
	)
}

export default useDocumentTitle
