import { ThreeDots } from "react-loading-icons"
import { useAuth } from "../../../Contexts/auth"
function FilmLoadingRequest() {
	const { language } = useAuth()

	return (
		<div className="loading-request flex my-0 mx-auto lg:h-[calc(var(--vh,1vh)*100)] h-[calc(var(--vh,1vh)*50)] flex-col justify-center items-center">
			<ThreeDots fill="#a30f0f" />
			<div
				className="loading-text"
				style={{ color: "white", textAlign: "center" }}
			>
				{language === "vi" ? "Đang tải phim" : "Loading anime"}
			</div>
		</div>
	)
}

export default FilmLoadingRequest
