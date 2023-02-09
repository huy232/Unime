import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ENG_GENRES } from "../../../constants"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"
import randomColor from "randomcolor"

import User from "../User"
import LanguageButton from "../../Content/LanguageButton"
import unimeLogo from "../../../Utilities/img/unime.png"

function HeaderENG() {
	let navigate = useNavigate()
	const [input, setInput] = useState("")
	const [sideBar, setSidebar] = useState(false)
	const [genreToggle, setGenreToggle] = useState(false)
	const sidebarRef = useRef()

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		handleScrollToTop()
		navigate(`/eng/search/${encodeURI(input)}`)
		setInput("")
	}
	const handleKeypress = (e) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			setSidebar(false)
			handleSubmit()
		}
	}
	const handleScrollToTop = () => {
		window.scrollTo(0, 0)
		window.history.scrollRestoration = "manual"
	}

	const handleClickOutside = (event) => {
		if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
			setSidebar(false)
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true)
		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [])

	return (
		<>
			<header ref={sidebarRef}>
				<div className="h-[40px] w-100 bg-[#222] fixed z-50 flex flex-col">
					<div className="flex flex-row h-100 items-center">
						<div className="h-100">
							<Link
								to="/eng"
								className="group hover:opacity-80 duration-200 ease-in-out h-100 inline-block flex items-center"
								onClick={() => setSidebar(false)}
							>
								<img
									className="group-hover:opacity-80 duration-200 ease-in-out h-[40px] w-[40px]"
									src={unimeLogo}
									alt=""
								/>
								<h1 className="font-black text-[1.5rem] p-0 my-0 h-auto max-sm:hidden mx-[6px]">
									UNIME
								</h1>
							</Link>
						</div>
						<div className="mx-[10px]">
							<form className="flex">
								<input
									type="text"
									placeholder="Search Anime..."
									className="search-navbar text-white max-sm:w-[140px] bg-[#00000099] px-[4px]"
									onChange={handleChange}
									onKeyPress={(e) => {
										handleKeypress(e)
									}}
									value={input}
								/>
								<button
									onClick={(e) => {
										setSidebar(false)
										handleSubmit(e)
									}}
									type="submit"
									className="submit-button ml-[4px] hover:opacity-80 duration-200 ease-in-out"
								>
									<BsSearch className="search-icon" />
								</button>
							</form>
						</div>
						<div
							className="ml-auto cursor-pointer flex h-[40px] w-[40px] items-center justify-center"
							onClick={() => setSidebar(!sideBar)}
						>
							<FontAwesomeIcon icon={faBars} />
						</div>
					</div>
				</div>

				<section
					className={`right-0 mt-[40px] fixed duration-200 ease-in-out bg-[#222] h-100 z-50 ${
						sideBar ? "opacity-100 w-[320px]" : "opacity-0 w-0"
					}`}
				>
					<div className="flex flex-col text-right [&>div]:my-[8px] mx-[6px]">
						<div>
							<Link
								to="/eng/anime"
								className="hover:opacity-80 duration-200 ease-in-out"
								onClick={() => {
									setSidebar(false)
									handleScrollToTop()
								}}
							>
								<h2 className=" font-semibold text-[1.5rem] my-0">ALL Anime</h2>
							</Link>
						</div>
						<div>
							<div
								className="cursor-pointer hover:opacity-80 duration-200 ease-in-out flex flex-row items-center justify-end"
								onClick={() => setGenreToggle(!genreToggle)}
							>
								<h2 className="font-semibold text-[1.5rem] mr-[6px] my-0">
									GENRES
								</h2>
								{genreToggle ? (
									<FontAwesomeIcon icon={faSortUp} className="pt-2" />
								) : (
									<FontAwesomeIcon icon={faSortDown} className="pb-1" />
								)}
							</div>
							<div
								className={`${
									genreToggle
										? "opacity-100 h-[200px] overflow-y-scroll"
										: "opacity-0 h-0 overflow-y-hidden"
								} duration-200 ease-in-out w-100`}
							>
								{ENG_GENRES.map((genre) => (
									<Link
										to={`/eng/anime/${genre.slug}`}
										key={genre.slug}
										onClick={() => {
											setSidebar(false)
											handleScrollToTop()
										}}
										className="hover:text-white hover:opacity-80 duration-200 ease-in-out"
									>
										<div className="">
											<p
												style={{
													background: `${randomColor({
														luminosity: "dark",
														format: "rgba",
														alpha: 0.8,
													})}`,
												}}
												className="inline-block p-[4px] m-[4px] rounded"
											>
												{genre.name}
											</p>
										</div>
									</Link>
								))}
							</div>
						</div>
						<div>
							<Link
								to="/eng/search-image"
								className="hover:opacity-80 duration-200 ease-in-out"
								onClick={() => {
									setSidebar(false)
									handleScrollToTop()
								}}
							>
								<h2 className=" font-semibold text-[1.5rem] my-0">
									IMAGE Search
								</h2>
							</Link>
						</div>
						<div className="flex ">
							<LanguageButton />
						</div>
						<div className="user-container">
							<User handleScrollToTop={handleScrollToTop} />
						</div>
					</div>
				</section>
			</header>
		</>
	)
}

export default HeaderENG
