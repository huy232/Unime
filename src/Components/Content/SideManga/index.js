import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

function SideManga({ chapters, provider, mangaID, chapterID }) {
	const scrollToRef = useRef(null)
	const [toggleSidebar, setToggleSidebar] = useState(false)
	return (
		<div className="fixed top-[40px] left-0 flex">
			<ul
				className={`${
					toggleSidebar ? "w-[296px]" : "w-[0px] left-[-330px]"
				} h-[calc(100vh-40px)] overflow-y-scroll relative duration-200 ease-in-out bg-black`}
			>
				{chapters.reverse().map((item) => (
					<Link
						to={`/eng/manga-read?mangaID=${mangaID}&chapterID=${item.id}&provider=${provider}`}
						className={`text-white hover:opacity-80 duration-200`}
						key={item.id}
					>
						<li
							className={`py-[6px] line-clamp-2 ${
								item.id === chapterID ? "bg-orange-600" : ""
							}`}
							ref={scrollToRef}
						>
							{item.title}
						</li>
					</Link>
				))}
			</ul>
			<div className="ml-[4px]">
				{toggleSidebar ? (
					<FontAwesomeIcon
						className="cursor-pointer rounded-full bg-gray-700 w-[20px] h-[20px] p-1"
						icon={faArrowLeft}
						onClick={() => setToggleSidebar(!toggleSidebar)}
					/>
				) : (
					<FontAwesomeIcon
						className="cursor-pointer rounded-full bg-gray-700 w-[20px] h-[20px] p-1"
						icon={faArrowRight}
						onClick={() => setToggleSidebar(!toggleSidebar)}
					/>
				)}
			</div>
		</div>
	)
}

export default SideManga
