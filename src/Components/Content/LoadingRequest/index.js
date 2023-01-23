import { ThreeDots } from "react-loading-icons"
import { useAuth } from "../../../Contexts/auth"
function LoadingRequest() {
	const { language } = useAuth()

	return (
		<div
			className="loading-request"
			style={{
				display: "flex",
				margin: "0 auto",
				height: "100vh",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
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

export default LoadingRequest
