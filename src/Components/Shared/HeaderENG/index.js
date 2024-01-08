import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { COLORLIST, ENG_GENRES, ENG_TAGS } from "../../../constants"
import { BsSearch, BsTags } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"
import { toSlug } from "../../../Utilities/toSlug"
import { FaArrowDownShortWide } from "react-icons/fa6"
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
	const [genreHeaderToggle, setGenreHeaderToggle] = useState(false)
	const sidebarRef = useRef()
	const genreHeaderRef = useRef()

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

	useEffect(() => {
		const handleClickOutsideSidebar = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setSidebar(false)
			}
		}

		const handleClickOutsideGenre = (event) => {
			if (
				genreHeaderToggle &&
				genreHeaderRef.current &&
				!genreHeaderRef.current.contains(event.target)
			) {
				setGenreHeaderToggle(false)
			}
		}

		document.addEventListener("click", handleClickOutsideSidebar)
		document.addEventListener("click", handleClickOutsideGenre)

		return () => {
			document.removeEventListener("click", handleClickOutsideSidebar)
			document.removeEventListener("click", handleClickOutsideGenre)
		}
	}, [genreHeaderToggle])

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
									className="submit-button ml-[4px] hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out"
									id="search-eng-btn"
									aria-label="Search button - ENG"
								>
									<BsSearch className="search-icon" />
								</button>
							</form>
						</div>
						{mangaUrlArray.indexOf(window.location.pathname) < 0 && (
							<div
								className="hidden sm:block select-none relative mx-1 px-2"
								ref={genreHeaderRef}
								onClick={() => setGenreHeaderToggle(!genreHeaderToggle)}
							>
								<button className="flex items-center justify-center gap-1 duration-200 ease-linear opacity-80 hover:opacity-100">
									<span>Genres & tags</span>
									<FaArrowDownShortWide className="mt-[2px]" />
								</button>
								{genreHeaderToggle && (
									<ul className="absolute min-w-[40vw] max-h-[80vh] overflow-y-scroll scrollbar-hide bg-black rounded p-2 mt-[6px] flex flex-wrap gap-1">
										<span className="w-full cursor-normal">Genres</span>
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
												<p
													style={{
														borderColor: `${COLORLIST[i]}`,
													}}
													className="inline-block p-[4px] m-[4px] rounded border-2 hover:brightness-150 ease-in-out duration-200 bg-white/5"
												>
													{genre}
												</p>
											</Link>
										))}
										<span className="w-full">Tags</span>
										{ENG_TAGS.map((tag, i) => (
											<Link
												to={`/eng/tag/${encodeURIComponent(tag)}`}
												key={tag}
												onClick={() => {
													handleScrollToTop()
													setSidebar(false)
												}}
												className="hover:text-white hover:opacity-80 duration-200 ease-in-out"
												aria-label={tag}
											>
												<p
													style={{
														borderColor: `${COLORLIST[i]}`,
													}}
													className="inline-block p-[4px] m-[4px] rounded border-2 hover:brightness-150 ease-in-out duration-200 bg-white/5"
												>
													{tag}
												</p>
											</Link>
										))}
									</ul>
								)}
							</div>
						)}

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
							: "opacity-0 w-[0px] -right-full"
					}`}
				>
					<div className="flex flex-col gap-2 text-right [&>div]:my-[8px] mx-[6px]">
						<Link
							to="/eng"
							className="hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out text-white"
							onClick={() => {
								handleScrollToTop()
								setSidebar(false)
							}}
							aria-label="Home - English"
						>
							<h2 className=" font-semibold text-[1.5rem] my-0">HOME</h2>
						</Link>

						<Link
							to="/eng/anime"
							className="hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out text-white"
							onClick={() => {
								handleScrollToTop()
								setSidebar(false)
							}}
							aria-label="All anime - English"
						>
							<h2 className=" font-semibold text-[1.5rem] my-0">ALL ANIME</h2>
						</Link>
						<button
							className="cursor-pointer hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out flex flex-row items-center justify-end"
							onClick={() => setGenreToggle(!genreToggle)}
						>
							<h2 className="font-semibold text-[1.5rem] mr-[6px] my-0">
								GENRES & TAGS
							</h2>
							{genreToggle ? (
								<FontAwesomeIcon icon={faSortUp} className="pt-2" />
							) : (
								<FontAwesomeIcon icon={faSortDown} className="pb-1" />
							)}
						</button>
						<div>
							<div
								className={`${
									genreToggle
										? "opacity-100 h-[200px] overflow-y-scroll scrollbar-hide"
										: "opacity-0 h-[0px] overflow-y-hidden"
								} duration-200 ease-in-out`}
							>
								<div className="w-full border-t-[1px] border-b-[1px] border-white text-center m-1">
									<span className="text-white text-left">Genres</span>
								</div>
								<div className="flex flex-wrap gap-1 justify-end">
									{ENG_GENRES.map((genre, i) => (
										<Link
											to={`/eng/anime/${encodeURIComponent(genre)}`}
											key={genre}
											onClick={() => {
												handleScrollToTop()
												setSidebar(false)
											}}
											className="text-white w-fit"
											aria-label={genre}
										>
											<p
												style={{
													borderColor: `${COLORLIST[i]}`,
												}}
												className="inline-block p-[4px] m-[4px] rounded border-2 hover:brightness-150 ease-in-out duration-200 bg-white/5"
											>
												{genre}
											</p>
										</Link>
									))}
								</div>
								<div className="w-full border-t-[1px] border-b-[1px] border-white text-center m-1">
									<span className="text-white text-left">Tags</span>
								</div>
								<div className="flex flex-wrap gap-1 justify-end">
									{ENG_TAGS.map((tag, i) => (
										<Link
											to={`/eng/tag/${encodeURIComponent(tag)}`}
											key={tag}
											onClick={() => {
												handleScrollToTop()
												setSidebar(false)
											}}
											className="text-white w-fit"
											aria-label={tag}
										>
											<p
												style={{
													borderColor: `${COLORLIST[i]}`,
												}}
												className="inline-block p-[4px] m-[4px] rounded border-2 hover:brightness-150 ease-in-out duration-200 bg-white/5"
											>
												{tag}
											</p>
										</Link>
									))}
								</div>
							</div>
						</div>

						<Link
							to="/eng/search-image"
							className="hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out text-white"
							onClick={() => {
								handleScrollToTop()
								setSidebar(false)
							}}
							aria-label="Search image"
						>
							<h2 className="font-semibold text-[1.5rem] my-0">IMAGE SEARCH</h2>
						</Link>

						<Link
							to="/eng/manga"
							className="hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out text-white"
							onClick={() => {
								handleScrollToTop()
								setSidebar(false)
							}}
							aria-label="Manga"
						>
							<h2 className="font-semibold text-[1.5rem] my-0">MANGA</h2>
						</Link>
						<div className="block sm:hidden my-0">
							<ContentToggleENG
								routeChecking={mangaUrlArray.indexOf(window.location.pathname)}
							/>
						</div>
						<div className="block sm:hidden my-0">
							<LanguageButton handleScrollToTop={handleScrollToTop} />
						</div>
						<div className="user-container mt-auto">
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
