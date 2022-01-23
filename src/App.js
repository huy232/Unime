import "./App.css"
import { API } from "./constants"
import axios from "axios"

import { Route, Routes } from "react-router-dom"

import Header from "./Components/Shared/Header"

import Home from "./Components/Content/Home"

function App() {
	const instance = axios.create({
		baseURL: API,
	})

	return (
		<div className="App">
			<Header />
			<div className="content" style={{ marginTop: "80px" }}>
				<Routes>
					<Route exact path="/" element={<Home instance={instance} />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
