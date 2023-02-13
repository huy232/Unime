import "./App.css"
import { API } from "./constants"
import axios from "axios"

import { useEffect } from "react"
import { AuthProvider } from "./Contexts/auth"
import { Route, Routes, useLocation } from "react-router-dom"

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
					</Routes>
				</div>
				{exclusionArray.indexOf(window.location.pathname) < 0 && <Footer />}
			</AuthProvider>
		</div>
	)
}

export default App
