import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"

function SideManga({
	chapters,
	provider,
	mangaID,
	chapterID,
	setToggleLoading,
	toggleLoading,
}) {
	const [toggleSidebar, setToggleSidebar] = useState(false)
	return (
		<div
			className={`fixed top-[40px] z-50 ${
				toggleSidebar ? "left-0" : "left-[-288px]"
			} duration-200 ease-in-out`}
		>
			<h2 className="h-[40px] bg-black m-0 w-[288px]">CHAPTER LIST</h2>
			<div className="flex">
				<ul
					className={`h-[calc(100vh-80px)] overflow-y-scroll relative bg-black w-[288px]`}
				>
					{chapters.map((item) => (
						<Link
							to={`/eng/manga-read?mangaID=${mangaID}&chapterID=${item.id}&provider=${provider}`}
							className={`text-white hover:opacity-80 duration-200 ${
								item.id === chapterID
									? "bg-orange-600"
									: "odd:bg-[#0D0D0D] even:bg-[#272727]"
							} block w-full`}
							key={item.id}
							onClick={() => {
								setToggleSidebar(false)
								setToggleLoading(!toggleLoading)
							}}
						>
							<li className={`py-[6px] line-clamp-2`}>{item.title}</li>
						</Link>
					))}
				</ul>
				<div className="ml-[4px] mt-[8px]">
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
		</div>
	)
}

export default SideManga
