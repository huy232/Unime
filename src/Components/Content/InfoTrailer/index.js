import ReactPlayer from "react-player"
import { MAINSITE } from "../../../constants"
function InfoTrailer({ trailerId }) {
	return (
		<>
			<div className="box-anime-film-trailer" style={{ marginTop: "40px" }}>
				{trailerId && (
					<>
						<h3>XEM THỬ NẾU BẠN CHƯA RÕ</h3>
						<div className="youtube-link">
							<ReactPlayer
								url={`https://www.youtube-nocookie.com/embed/${trailerId}&origin=${MAINSITE}`}
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
