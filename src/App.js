import "./App.css"
import { API } from "./constants"
import axios from "axios"

import { useEffect } from "react"
import { AuthProvider } from "./Contexts/auth"
import { Route, Routes, useLocation } from "react-router-dom"

import Header from "./Components/Shared/Header"
import Footer from "./Components/Shared/Footer"
// VIET
import Home from "./Components/Content/Home"
import AnimeList from "./Components/Content/AnimeList"
import AnimeGenre from "./Components/Content/AnimeGenre"
import Search from "./Components/Content/Search"
import AnimeInfo from "./Components/Content/AnimeInfo"
import AnimeWatch from "./Components/Content/AnimeWatch"
import AnimeCollection from "./Components/Content/AnimeCollection"
import Login from "./Components/Content/Login"
// ENG
import HomeENG from "./Components/Content/HomeENG"
import AnimeSearchENG from "./Components/Content/AnimeSearchENG"
import AnimeBrowseENG from "./Components/Content/AnimeBrowseENG"
import AnimeBrowseCategoryENG from "./Components/Content/AnimeBrowseCategoryENG"
import AnimeInfoENG from "./Components/Content/AnimeInfoENG"
import AnimeWatchENG from "./Components/Content/AnimeWatchENG"
// NOT FOUND
import NotFound from "./Components/Content/NotFound"
import Films from "./Components/Content/Films"

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
	}, [])
	return (
		<div className="App">
			<AuthProvider>
				{exclusionArray.indexOf(window.location.pathname) < 0 && <Header />}
				<div className="content" style={{ marginTop: "90px", width: "100%" }}>
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
						{/* SHARED */}
						<Route path="login" element={<Login />} />
						<Route path="*" element={<NotFound />} />
						{/* FILMS */}
						<Route path="/films" element={<Films />} />
					</Routes>
				</div>
				{exclusionArray.indexOf(window.location.pathname) < 0 && <Footer />}
			</AuthProvider>
		</div>
	)
}

export default App
