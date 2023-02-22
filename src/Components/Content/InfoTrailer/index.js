import ReactPlayer from "react-player"
import { MAINSITE } from "../../../constants"
function InfoTrailer({ videoUrl }) {
	return (
		<>
			<div className="box-anime-film-trailer" style={{ marginTop: "40px" }}>
				{videoUrl && (
					<>
						<h3>XEM THỬ NẾU BẠN CHƯA RÕ</h3>
						<div className="youtube-link">
							<ReactPlayer
								url={`${videoUrl}&origin=${MAINSITE}`}
								controls={true}
							/>
						</div>
					</>
				)}
			</div>
		</>
	)
}

export default InfoTrailer
