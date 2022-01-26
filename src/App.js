import "./App.css"
import { API } from "./constants"
import axios from "axios"

import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import Header from "./Components/Shared/Header"
import Footer from "./Components/Shared/Footer"

import Home from "./Components/Content/Home"
import AnimeList from "./Components/Content/AnimeList"
import AnimeGenre from "./Components/Content/AnimeGenre"
import Search from "./Components/Content/Search"

function App() {
	const instance = axios.create({
		baseURL: API,
	})

	useEffect(() => {
		window.history.scrollRestoration = "manual"
	}, [])

	return (
		<div className="App">
			<Header />
			<div className="content" style={{ marginTop: "90px" }}>
				<Routes>
					<Route exact path="/" element={<Home instance={instance} />} />
					<Route path="/anime" element={<AnimeList instance={instance} />} />
					<Route
						path="/anime/:genre"
						element={<AnimeGenre instance={instance} />}
					/>
					<Route
						path="search/:searchSlug"
						element={<Search instance={instance} />}
					/>
				</Routes>
			</div>
			<Footer />
		</div>
	)
}

export default App
