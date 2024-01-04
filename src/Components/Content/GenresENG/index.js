import { ENG_GENRES, COLORLIST } from "../../../constants"
import { Link } from "react-router-dom"
import "./genreseng.css"

function GenresENG() {
	return (
		<div>
			<div className="scroll" style={{ "--time": "900s" }}>
				<div>
					{ENG_GENRES.map((genre, i) => (
						<Link
							to={`/eng/anime/${encodeURIComponent(genre)}`}
							key={genre}
							aria-label={genre}
							style={{ background: `none`, transition: "0.5s" }}
							onMouseEnter={(e) =>
								(e.target.style.background = `${COLORLIST[i]}`)
							}
							onMouseLeave={(e) => (e.target.style.background = "none")}
						>
							{genre}
						</Link>
					))}
				</div>
				<div>
					{ENG_GENRES.map((genre, i) => (
						<Link
							to={`/eng/anime/${encodeURIComponent(genre)}`}
							key={genre}
							aria-label={genre}
							style={{ background: `none`, transition: "0.5s" }}
							onMouseEnter={(e) =>
								(e.target.style.background = `${COLORLIST[i]}`)
							}
							onMouseLeave={(e) => (e.target.style.background = "none")}
						>
							{genre}
						</Link>
					))}
				</div>
			</div>

			<div className="scroll" style={{ "--time": "1200s" }}>
				<div>
					{ENG_GENRES.map((genre, i) => (
						<Link
							to={`/eng/anime/${genre}`}
							key={genre}
							aria-label={genre}
							style={{ background: `none`, transition: "0.5s" }}
							onMouseEnter={(e) =>
								(e.target.style.background = `${COLORLIST[i]}`)
							}
							onMouseLeave={(e) => (e.target.style.background = "none")}
						>
							{genre}
						</Link>
					))}
				</div>
				<div>
					{ENG_GENRES.map((genre, i) => (
						<Link
							to={`/eng/anime/${genre}`}
							key={genre}
							aria-label={genre}
							style={{ background: `none`, transition: "0.5s" }}
							onMouseEnter={(e) =>
								(e.target.style.background = `${COLORLIST[i]}`)
							}
							onMouseLeave={(e) => (e.target.style.background = "none")}
						>
							{genre}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default GenresENG
