import { GENRES, COLORLIST } from "../../../constants"
import { Link } from "react-router-dom"
import "./genresvi.css"

function GenresVI() {
	return (
		<div className="mt-16">
			<div className="scroll" style={{ "--time": "50s" }}>
				<div>
					{GENRES.map((genre, i) => (
						<Link
							to={`/anime/${genre.slug}`}
							key={genre.slug}
							aria-label={genre.slug}
							style={{ background: `none`, transition: "0.5s" }}
							onMouseEnter={(e) =>
								(e.target.style.background = `${COLORLIST[i]}`)
							}
							onMouseLeave={(e) => (e.target.style.background = "none")}
						>
							{genre.name}
						</Link>
					))}
				</div>
				<div>
					{GENRES.map((genre, i) => (
						<Link
							to={`/anime/${genre.slug}`}
							key={genre.slug}
							aria-label={genre.slug}
							style={{ background: `none`, transition: "0.5s" }}
							onMouseEnter={(e) =>
								(e.target.style.background = `${COLORLIST[i]}`)
							}
							onMouseLeave={(e) => (e.target.style.background = "none")}
						>
							{genre.name}
						</Link>
					))}
				</div>
			</div>

			<div className="scroll" style={{ "--time": "55s" }}>
				<div>
					{GENRES.map((genre, i) => (
						<Link
							to={`/anime/${genre.slug}`}
							key={genre.slug}
							aria-label={genre.slug}
							style={{ background: `none`, transition: "0.5s" }}
							onMouseEnter={(e) =>
								(e.target.style.background = `${COLORLIST[i]}`)
							}
							onMouseLeave={(e) => (e.target.style.background = "none")}
						>
							{genre.name}
						</Link>
					))}
				</div>
				<div>
					{GENRES.map((genre, i) => (
						<Link
							to={`/anime/${genre.slug}`}
							key={genre.slug}
							aria-label={genre.slug}
							style={{ background: `none`, transition: "0.5s" }}
							onMouseEnter={(e) =>
								(e.target.style.background = `${COLORLIST[i]}`)
							}
							onMouseLeave={(e) => (e.target.style.background = "none")}
						>
							{genre.name}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default GenresVI
