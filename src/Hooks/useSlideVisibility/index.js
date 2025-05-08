// hooks/useSlideVisibility.js
import { useEffect, useState } from "react"

export function useSlideVisibility(slideRefs, totalSlides, activeIndex) {
	const [visibleSlides, setVisibleSlides] = useState({})

	useEffect(() => {
		const observers = []

		for (let i = 0; i < totalSlides; i++) {
			const el = slideRefs.current[i]
			if (!el) continue

			const observer = new IntersectionObserver(
				([entry]) => {
					setVisibleSlides((prev) => ({
						...prev,
						[i]: entry.isIntersecting,
					}))
				},
				{
					root: null,
					threshold: 0.5,
				}
			)

			observer.observe(el)
			observers.push(observer)
		}

		return () => {
			observers.forEach((observer, i) => {
				const el = slideRefs.current[i]
				if (el) observer.unobserve(el)
			})
		}
	}, [slideRefs, totalSlides])

	// Mark active slide as visible initially if no observer yet
	useEffect(() => {
		if (slideRefs.current[activeIndex]) {
			setVisibleSlides((prev) => ({
				...prev,
				[activeIndex]: true,
			}))
		}
	}, [slideRefs, activeIndex])

	return visibleSlides
}
