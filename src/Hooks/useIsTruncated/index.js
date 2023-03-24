import { useEffect } from "react"
import { useState } from "react"

function useIsTruncated(element) {
	const determineIsTruncated = () => {
		if (!element.current) return false
		const check = element.current.scrollHeight > element.current.clientHeight
		return check
	}
	const [isTruncated, setIsTruncated] = useState(determineIsTruncated())
	useEffect(() => {
		setIsTruncated(determineIsTruncated())
	}, [element])
	return isTruncated
}

export default useIsTruncated
