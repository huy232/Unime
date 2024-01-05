const million = require("million/compiler")

module.exports = {
	webpack: {
		configure: (webpackConfig, { env }) => {
			// Disable source maps for production
			if (env === "production") {
				webpackConfig.devtool = false
			}

			// Add your existing million webpack plugin configuration
			webpackConfig.plugins.push(million.webpack({ auto: true }))

			return webpackConfig
		},
	},
}
