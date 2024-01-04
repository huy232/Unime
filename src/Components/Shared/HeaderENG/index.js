import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { COLORLIST, ENG_GENRES } from "../../../constants"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"
import { toSlug } from "../../../Utilities/toSlug"
import User from "../User"
import LanguageButton from "../../Content/LanguageButton"
import ContentToggleENG from "../../Content/ContentToggleENG"
import unimeLogo from "../../../Utilities/img/unime.webp"
import Image from "../../Content/Image"

function HeaderENG() {
	let navigate = useNavigate()
	const pathname = useLocation()
	const [input, setInput] = useState("")
	const [sideBar, setSidebar] = useState(false)
	const [genreToggle, setGenreToggle] = useState(false)
	const sidebarRef = useRef()
	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const mangaUrlArray = [
		`/eng/manga`,
		`/eng/manga-info/${pathname.pathname.split("/")[3]}`,
		`/eng/manga-search/${pathname.pathname.split("/")[3]}`,
		`/eng/manga-read`,
		`/eng/manga-list/${pathname.pathname.split("/")[3]}`,
	]
	const handleSubmit = (e) => {
		e.preventDefault()
		if (input !== "") {
			handleScrollToTop()
			if (mangaUrlArray.indexOf(window.location.pathname) < 0) {
				navigate(`/eng/search/${encodeURI(toSlug(input.trim()))}`)
			} else {
				navigate(`/eng/manga-search/${encodeURI(toSlug(input.trim()))}`)
			}
			setInput("")
		}
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
								to={
									mangaUrlArray.indexOf(window.location.pathname) < 0
										? `/eng`
										: `/eng/manga`
								}
								className="group hover:opacity-80 duration-200 ease-in-out h-100 flex items-center"
								onClick={() => setSidebar(false)}
								aria-label="Home - English"
							>
								<Image
									className="group-hover:opacity-80 h-[34px] w-[34px] duration-500 ease-in-out"
									src={unimeLogo || ""}
									alt="UNIME-LOGO"
									loading="lazy"
								/>
								<h1 className="font-black text-[1.5rem] p-0 my-0 h-auto max-sm:hidden mx-[6px] text-[#fffc]">
									UNIME
								</h1>
							</Link>
						</div>
						<div className="mx-[10px]">
							<form className="flex">
								<input
									type="text"
									placeholder={
										mangaUrlArray.indexOf(window.location.pathname) < 0
											? `Search anime...`
											: `Search manga...`
									}
									className="search-navbar w-[150px] text-white max-sm:w-full bg-[#00000099] px-[2px] text-sm rounded-md"
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
									id="search-eng-btn"
									aria-label="Search button - ENG"
								>
									<BsSearch className="search-icon" />
								</button>
							</form>
						</div>
						<div className="ml-auto flex items-center justify-center">
							<div className="hidden sm:block">
								<ContentToggleENG
									routeChecking={mangaUrlArray.indexOf(
										window.location.pathname
									)}
								/>
							</div>
							<div className="hidden sm:block">
								<LanguageButton handleScrollToTop={handleScrollToTop} />
							</div>
							<div
								className="cursor-pointer flex h-[40px] w-[40px] items-center justify-center"
								onClick={() => setSidebar(!sideBar)}
							>
								<FontAwesomeIcon icon={faBars} />
							</div>
						</div>
					</div>
				</div>

				<section
					className={`mt-[40px] fixed duration-200 ease-in-out bg-[#222] h-100 z-50 ${
						sideBar
							? "opacity-100 w-[320px] right-0"
							: "opacity-0 right-[-320px]"
					}`}
				>
					<div className="flex flex-col text-right [&>div]:my-[8px] mx-[6px]">
						<div>
							<Link
								to="/eng"
								className="hover:opacity-80 duration-200 ease-in-out"
								onClick={() => {
									handleScrollToTop()
									setSidebar(false)
								}}
								aria-label="Home - English"
							>
								<h2 className=" font-semibold text-[1.5rem] my-0">HOME</h2>
							</Link>
						</div>
						<div>
							<Link
								to="/eng/anime"
								className="hover:opacity-80 duration-200 ease-in-out"
								onClick={() => {
									handleScrollToTop()
									setSidebar(false)
								}}
								aria-label="All anime - English"
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
								{ENG_GENRES.map((genre, i) => (
									<Link
										to={`/eng/anime/${encodeURIComponent(genre)}`}
										key={genre}
										onClick={() => {
											handleScrollToTop()
											setSidebar(false)
										}}
										className="hover:text-white hover:opacity-80 duration-200 ease-in-out"
										aria-label={genre}
									>
										<div>
											<p
												style={{
													background: `${COLORLIST[i]}`,
												}}
												className="inline-block p-[4px] m-[4px] rounded"
											>
												{genre}
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
									handleScrollToTop()
									setSidebar(false)
								}}
								aria-label="Search image"
							>
								<h2 className="font-semibold text-[1.5rem] my-0">
									IMAGE Search
								</h2>
							</Link>
						</div>
						<div>
							<Link
								to="/eng/manga"
								className="hover:opacity-80 duration-200 ease-in-out"
								onClick={() => {
									handleScrollToTop()
									setSidebar(false)
								}}
								aria-label="Manga"
							>
								<h2 className="font-semibold text-[1.5rem] my-0">Manga</h2>
							</Link>
						</div>

						<div className="block sm:hidden">
							<ContentToggleENG
								routeChecking={mangaUrlArray.indexOf(window.location.pathname)}
							/>
						</div>
						<div className="block sm:hidden">
							<LanguageButton handleScrollToTop={handleScrollToTop} />
						</div>
						<div className="user-container">
							<User
								handleScrollToTop={handleScrollToTop}
								setSidebar={setSidebar}
							/>
						</div>
					</div>
				</section>
			</header>
		</>
	)
}

export default HeaderENG
