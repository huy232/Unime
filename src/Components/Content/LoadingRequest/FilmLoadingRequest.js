import { ThreeDots } from "react-loading-icons"
// import { useAuth } from "../../../Contexts/auth"
import { useLocation } from "react-router-dom"
function FilmLoadingRequest() {
	// const { language } = useAuth()
	const pathname = useLocation()
	const languageDistinct = pathname.pathname.split("/")[1]

	return (
		<div className="loading-request flex my-0 mx-auto lg:h-[calc(var(--vh,1vh)*100)] h-[calc(var(--vh,1vh)*50)] flex-col justify-center items-center">
			<ThreeDots fill="#a30f0f" />
			<div
				className="loading-text"
				style={{ color: "white", textAlign: "center" }}
			>
				{languageDistinct === "eng" ? "Loading anime" : "Đang tải phim"}
			</div>
		</div>
	)
}

export default FilmLoadingRequest
