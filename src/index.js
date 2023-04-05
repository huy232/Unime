import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "swiper/css/bundle"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-loading-skeleton/dist/skeleton.css"
import "/node_modules/flag-icons/css/flag-icons.min.css"
import "./override.css"
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

const root = createRoot(document.getElementById("root"))
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.ready.then((registration) => {
		registration.unregister()
		if (caches) {
			// Service worker cache should be cleared with caches.delete()
			caches.keys().then(async (names) => {
				await Promise.all(names.map((name) => caches.delete(name)))
			})
		}
	})
}

// serviceWorkerRegistration.register()
