// import { useEffect } from "react"

// function useDebug() {
// 	useEffect(() => {
// 		let div = document.createElement("div")
// 		let loop = setInterval(() => {
// 			;(function () {
// 				debugger
// 			})()
// 		})
// 		Object.defineProperty(div, "id", {
// 			get: () => {
// 				clearInterval(loop)
// 				alert("Dev Tools detected!")
// 			},
// 		})
// 		return () => {
// 			clearInterval(loop)
// 		}
// 	})
// }

// export default useDebug
