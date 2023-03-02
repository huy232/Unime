// import { useEffect } from "react"

// function useDebug() {
// 	useEffect(() => {
// 		console.log("Use Debug")
// 		document.addEventListener("contextmenu", (e) => e.preventDefault())

// 		function ctrlShiftKey(e, keyCode) {
// 			return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0)
// 		}

// 		document.onkeydown = (e) => {
// 			// Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
// 			console.log(e.key)
// 			if (
// 				e.key === "F12"
// 				// ||
// 				// ctrlShiftKey(e, 'I') ||
// 				// ctrlShiftKey(e, 'J') ||
// 				// ctrlShiftKey(e, 'C') ||
// 				// (e.ctrlKey && e.key === 'U'.charCodeAt(0))
// 			)
// 				debugger
// 		}
// 	}, [])
// }

// export default useDebug
