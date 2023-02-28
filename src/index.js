import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "swiper/css/bundle"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-loading-skeleton/dist/skeleton.css"
import "./override.css"
// import { DEBUGGER } from "./Utilities/debugger"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

const root = createRoot(document.getElementById("root"))
// DEBUGGER()
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)

serviceWorkerRegistration.register()
