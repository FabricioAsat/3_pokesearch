/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				gridCards: "repeat(auto-fill, minmax(192px, 1fr))",
			},
		},
	},
	plugins: [],
};
