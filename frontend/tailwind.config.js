/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class', // Enable class-based dark mode
	content: [
		'./index.html',
		'./src/**/*.{ts,tsx,js,jsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#2563EB',
					foreground: '#FFFFFF',
				},
				muted: '#F3F4F6',
			},
		},
	},
	plugins: [],
};


