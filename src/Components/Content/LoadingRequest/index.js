import { ThreeDots } from "react-loading-icons"
function LoadingRequest() {
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
				Đang tải phim
			</div>
		</div>
	)
}

export default LoadingRequest
