import ScrollToTop from "react-scroll-to-top"

const ScrollToTopButton = () => {
	return (
		<ScrollToTop
			smooth
			color="#FF004D"
			className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-white p-1 duration-200 ease-in-out hover:brightness-125 hover:scale-110 right-2 bottom-16"
		/>
	)
}

export default ScrollToTopButton
