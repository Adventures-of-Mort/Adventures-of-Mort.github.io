module.exports = {
	// production mode
	mode: "production",

	// input file
	entry: "./source/js/game.js",
	// watch: true,

	// output file
	output: {
		// file name
		filename: "bundle.js",

		// complete path
		path: __dirname,
	},
}
