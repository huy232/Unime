/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"],
				"bebas-neue": ["Bebas Neue", "sans-serif"],
			},
			animation: {
				fadeIn: "fadeIn 0.3s ease-in-out",
				fadeOut: "fadeOut 0.3s ease-in-out",
				"infinite-scroll": "infinite-scroll 25s linear infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				fadeOut: {
					"100%": { opacity: 1 },
					"0%": { opacity: 0 },
				},
				"infinite-scroll": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-100%)" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
}
