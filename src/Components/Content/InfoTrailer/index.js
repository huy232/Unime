import ReactPlayer from "react-player"
function InfoTrailer({ videoUrl }) {
	return (
		<>
			<div className="box-anime-film-trailer" style={{ marginTop: "40px" }}>
				{videoUrl ? (
					<>
						<h3>XEM THỬ NẾU BẠN CHƯA RÕ</h3>
						<div className="youtube-link">
							<ReactPlayer
								url={`${videoUrl}&origin=https://mirai-huy8856.vercel.app/`}
								controls={true}
							/>
						</div>
					</>
				) : (
					""
				)}
			</div>
		</>
	)
}

export default InfoTrailer
