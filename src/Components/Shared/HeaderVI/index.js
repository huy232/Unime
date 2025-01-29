import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { COLORLIST, GENRES } from "../../../constants"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"
import User from "../User"
import LanguageButton from "../../Content/LanguageButton"
import { toSlug } from "../../../Utilities/toSlug"
import unimeLogo from "../../../Utilities/img/unime.webp"
import Image from "../../Content/Image"
import { FaArrowDownWideShort } from "react-icons/fa6"

function HeaderVI() {
	let navigate = useNavigate()
	const [input, setInput] = useState("")
	const [sideBar, setSidebar] = useState(false)
	const [genreToggle, setGenreToggle] = useState(false)
	const [genreHeaderToggle, setGenreHeaderToggle] = useState(false)
	const sidebarRef = useRef()
	const genreHeaderRef = useRef()

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (input !== "") {
			handleScrollToTop()
			navigate(`/search/${encodeURI(toSlug(input.trim(), " "))}`)
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
		<header ref={sidebarRef}>
			<div className="h-[40px] w-100 bg-[#222] fixed z-50 flex flex-col">
				<div className="flex flex-row h-100 items-center">
					<div className="h-100 mx-2">
						<Link
							to="/"
							className="group hover:opacity-80 duration-200 ease-in-out h-100 flex items-center"
							onClick={() => {
								setSidebar(false)
							}}
							aria-label="Home - Viet"
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
					<div className="mx-[6px]">
						<form className="flex">
							<input
								type="text"
								placeholder="Tìm kiếm Anime..."
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
								className="submit-button ml-[6px] hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out"
								id="search-vi-btn"
								aria-label="Search button - VIET"
							>
								<BsSearch className="search-icon" />
							</button>
						</form>
					</div>
					<div
						className="hidden sm:block cursor-pointer select-none relative mx-1 px-2"
						ref={genreHeaderRef}
						onClick={() => setGenreHeaderToggle(!genreHeaderToggle)}
					>
						<div className="flex items-center justify-center gap-1 duration-200 ease-linear opacity-80 hover:opacity-100">
							<span>Thể loại</span>
							<FaArrowDownWideShort className="mt-[2px]" />
						</div>
						{genreHeaderToggle && (
							<ul className="absolute min-w-[40vw] max-h-[80vh] overflow-y-scroll scrollbar-hide bg-black rounded p-2 mt-[6px] flex flex-wrap gap-1">
								{GENRES.map((genre, i) => (
									<Link
										to={`/anime/${genre.slug}`}
										key={genre.slug}
										onClick={() => {
											handleScrollToTop()
											setSidebar(false)
										}}
										className="hover:text-white hover:opacity-80 duration-200 ease-in-out"
										aria-label={genre.slug}
									>
										<p
											style={{
												borderColor: `${COLORLIST[i]}`,
											}}
											className="inline-block p-[4px] m-[4px] rounded border-2 hover:brightness-150 ease-in-out duration-200 bg-white/5"
										>
											{genre.name}
										</p>
									</Link>
								))}
							</ul>
						)}
					</div>
					<div className="ml-auto flex items-center justify-center">
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
				className={`right-0 mt-[40px] fixed duration-200 ease-in-out bg-[#222] h-100 z-50 ${
					sideBar
						? "opacity-100 w-[320px] right-0"
						: "opacity-0 w-[0px] -right-full"
				}`}
			>
				<div className="flex flex-col text-right [&>div]:my-[8px] mx-[6px]">
					<div>
						<Link
							to="/anime"
							className="hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out text-white flex flex-row items-center justify-end"
							onClick={() => {
								handleScrollToTop()
								setSidebar(false)
							}}
							aria-label="All anime - Viet"
						>
							<h2 className="font-semibold text-[1.5rem] m-0">Tất cả Anime</h2>
						</Link>
					</div>
					<button
						className="cursor-pointer hover:brightness-150 opacity-80 hover:opacity-100 duration-200 ease-in-out text-white flex flex-row items-center justify-end"
						onClick={() => setGenreToggle(!genreToggle)}
					>
						<h2 className="font-semibold text-[1.5rem] my-0 mr-[6px] ">
							Thể loại
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
									? "opacity-100 h-[200px] overflow-y-scroll"
									: "opacity-0 h-0 overflow-y-hidden"
							} duration-200 ease-in-out w-100`}
						>
							{GENRES.map((genre, i) => (
								<Link
									to={`/anime/${genre.slug}`}
									key={genre.slug}
									onClick={() => {
										handleScrollToTop()
										setSidebar(false)
									}}
									className="hover:text-white hover:opacity-80 duration-200 ease-in-out"
									aria-label={genre.slug}
								>
									<p
										style={{
											borderColor: `${COLORLIST[i]}`,
										}}
										className="inline-block p-[4px] m-[4px] rounded border-2 hover:brightness-150 ease-in-out duration-200 bg-white/5"
									>
										{genre.name}
									</p>
								</Link>
							))}
						</div>
					</div>
					<div className="block sm:hidden my-0">
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
	)
}

export default HeaderVI
