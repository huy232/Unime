/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				fadeOut: {
					"100%": { opacity: 1 },
					"0%": { opacity: 0 },
				},
				animation: {
					fadeIn: "fadeIn 0.3s ease-in-out",
					fadeOut: "fadeOut 0.3s ease-in-out",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
	purge: {
		content: [
			"./src/**/*.js",
			"./src/**/*.css",
			"./node_modules/react-bootstrap/**/*.js",
		],
	},
}
