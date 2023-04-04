import "./App.css"
import { API } from "./constants"
import axios from "axios"

import { useEffect } from "react"
import { AuthProvider } from "./Contexts/auth"
import { Route, Routes, useLocation } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import Header from "./Components/Shared/Header"
import Footer from "./Components/Shared/Footer"
// VIET
import Home from "./Pages/Home"
import AnimeList from "./Pages/AnimeList"
import AnimeGenre from "./Pages/AnimeGenre"
import Search from "./Pages/Search"
import AnimeInfo from "./Pages/AnimeInfo"
import AnimeWatch from "./Pages/AnimeWatch"
import AnimeCollection from "./Pages/AnimeCollection"
import Login from "./Pages/Login"
// ENG
import HomeENG from "./Pages/HomeENG"
import AnimeSearchENG from "./Pages/AnimeSearchENG"
import AnimeBrowseENG from "./Pages/AnimeBrowseENG"
import AnimeBrowseCategoryENG from "./Pages/AnimeBrowseCategoryENG"
import AnimeInfoENG from "./Pages/AnimeInfoENG"
import AnimeWatchENG from "./Pages/AnimeWatchENG"
import AnimeImageSearch from "./Pages/AnimeImageSearch"
import AnimeBrowseMoreENG from "./Pages/AnimeBrowseMoreENG"
// NOT FOUND
import NotFound from "./Pages/NotFound"
// FILMS
import Films from "./Components/Content/Films"
import FilmInfo from "./Components/Content/FilmInfo"
import MangaENG from "./Pages/MangaENG"
import MangaInfoENG from "./Pages/MangaInfoENG"
import MangaBrowseENG from "./Components/Content/MangaBrowseENG"
import MangaViewENG from "./Pages/MangaViewENG"

function App() {
	const instance = axios.create({
		baseURL: API,
	})
	const pathname = useLocation()
	const exclusionArray = [
		`/watch/${pathname.pathname.split("/")[2]}`,
		`/eng/watch/${pathname.pathname.split("/")[3]}`,
		`/login`,
	]
	const exclusionArrayFooter = [`/eng/search-image`]
	const mangaUrlList = ["top", "trending", "popular", "manhwa"]
	useEffect(() => {
		window.history.scrollRestoration = "manual"
		function resize() {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty("--vh", `${vh}px`)
		}

		window.addEventListener("resize", resize)
		window.addEventListener("load", resize)
	}, [])

	return (
		<div className="App">
			<AuthProvider>
				{exclusionArray.indexOf(window.location.pathname) < 0 && (
					<>
						<Header />
						<div className="heading-hidden h-[40px]"></div>
					</>
				)}

				<div className="content">
					<Routes>
						{/* VIET ANIME*/}
						<Route exact path="/" element={<Home instance={instance} />} />
						<Route path="/anime" element={<AnimeList instance={instance} />} />
						<Route
							path="/anime/:genre"
							element={<AnimeGenre instance={instance} />}
						/>
						<Route
							path="/collection/:collection"
							element={<AnimeCollection instance={instance} />}
						/>
						<Route
							path="search/:searchSlug"
							element={<Search instance={instance} />}
						/>
						<Route
							path="info/:anime"
							element={<AnimeInfo instance={instance} />}
						/>
						<Route
							path="watch/:anime"
							element={<AnimeWatch instance={instance} />}
						/>
						{/* ENG ANIME */}
						<Route exact path="/eng/" element={<HomeENG />} />
						<Route path="/eng/search/:query" element={<AnimeSearchENG />} />
						<Route exact path="/eng/anime" element={<AnimeBrowseENG />} />
						<Route
							path="/eng/anime/:genre"
							element={<AnimeBrowseCategoryENG />}
						/>
						<Route path="/eng/info/:animeId" element={<AnimeInfoENG />} />
						<Route path="/eng/watch/:animeId" element={<AnimeWatchENG />} />
						<Route
							path="/eng/recent-anime"
							element={
								<AnimeBrowseMoreENG
									urlString={"recent-anime"}
									urlTitle={"RECENT ANIME"}
								/>
							}
						/>
						<Route
							path="/eng/trending"
							element={
								<AnimeBrowseMoreENG
									urlString={"popular"}
									urlTitle={"TRENDING"}
								/>
							}
						/>
						<Route path="/eng/search-image/" element={<AnimeImageSearch />} />
						{/* SHARED */}
						<Route path="login" element={<Login />} />
						<Route path="*" element={<NotFound />} />
						{/* FILMS */}
						<Route path="/films" element={<Films />} />
						<Route path="/films/info/:type/:filmSlug" element={<FilmInfo />} />
						{/* MANGA */}
						<Route path="/eng/manga" element={<MangaENG />} />
						<Route path="/eng/manga-info/:mangaID" element={<MangaInfoENG />} />
						<Route
							path={`/eng/manga-list/popular`}
							element={
								<MangaBrowseENG subUrl={"manga-popular"} title={"POPULAR"} />
							}
						/>
						<Route
							path={`/eng/manga-list/trending`}
							element={
								<MangaBrowseENG subUrl={"manga-trending"} title={"TRENDING"} />
							}
						/>
						<Route
							path={`/eng/manga-list/manhwa`}
							element={
								<MangaBrowseENG subUrl={"manga-manhwa"} title={"MANHWA"} />
							}
						/>
						<Route path={`/eng/manga-read/`} element={<MangaViewENG />} />
					</Routes>
				</div>
				{!!(
					exclusionArray.indexOf(window.location.pathname) < 0 &&
					exclusionArrayFooter.indexOf(window.location.pathname)
				) && <Footer />}
				<Analytics />
			</AuthProvider>
		</div>
	)
}

export default App
