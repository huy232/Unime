import "./App.css"
import { API } from "./constants"
import axios from "axios"

import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import Header from "./Components/Shared/Header"
import Footer from "./Components/Shared/Footer"

import Home from "./Components/Content/Home"
import AnimeList from "./Components/Content/AnimeList"
import AnimeGenre from "./Components/Content/AnimeGenre"
import Search from "./Components/Content/Search"
import AnimeInfo from "./Components/Content/AnimeInfo"
import AnimeWatch from "./Components/Content/AnimeWatch"
import AnimeCollection from "./Components/Content/AnimeCollection"
import Login from "./Components/Content/Login"

import { AuthProvider } from "./Contexts/auth"

function App() {
	const instance = axios.create({
		baseURL: API,
	})

	useEffect(() => {
		window.history.scrollRestoration = "manual"
	}, [])
	const pathname = useLocation()
	return (
		<div className="App">
			<AuthProvider>
				{window.location.pathname ===
					`/watch/${pathname.pathname.split("/")[2]}` ||
				window.location.pathname === `/login` ? (
					""
				) : (
					<Header />
				)}

				<div className="content" style={{ marginTop: "90px", width: "100%" }}>
					<Routes>
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
						<Route path="login" element={<Login />} />
					</Routes>
				</div>
				{window.location.pathname ===
					`/watch/${pathname.pathname.split("/")[2]}` ||
				window.location.pathname === `/login` ? (
					""
				) : (
					<Footer />
				)}
			</AuthProvider>
		</div>
	)
}

export default App
