/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  fontFamily: {
		display: ['Satoshi'],
		body: ['Satoshi'],
	  },
	  container: {
		center: true,
		padding: {
		  DEFAULT: '2rem',
		},
	  },
	  screens: {
		xl: '1280px',
		lg: '1024px',
		md: '768px',
		sm: '640px',
		xs: '380px',
	  },
	  extend: {
		colors: {
		  primary: {
			50: '#e7f5e7',
			100: '#d0ecd0',
			200: '#a1d9a1',
			300: '#71c571',
			400: '#42b242',
			500: '#139f13',
			600: '#0f7f0f',
			700: '#0b5f0b',
			800: '#084008',
			900: '#042004',
		  },
		  secondary: {
			50: '#edfbfd',
			100: '#dcf7fb',
			200: '#b9eff7',
			300: '#95e7f3',
			400: '#72dfef',
			500: '#4fd7eb',
			600: '#3facbc',
			700: '#2f818d',
			800: '#20565e',
			900: '#102b2f',
		  },
		  addition: {
			50: '#fdefed',
			100: '#fbe0dc',
			200: '#f6b1a7',
			300: '#f4a195',
			400: '#f08172',
			500: '#ec624f',
			600: '#bd4e3f',
			700: '#8e3b2f',
			800: '#5e2720',
			900: '#2f1410',
		  },
		  neutral: {
			100: '#F9FAFB',
			200: '#F4F6F8',
			300: '#DFE3E8',
			400: '#C4CDD5',
			500: '#919EAB',
			600: '#637381',
			700: '#454F5B',
			800: '#212B36',
		  },
		  error: {
			500: '#e4513d',
		  },
		  warning: {
			500: '#ffb235',
		  },
		  info: {
			500: '#25B1D4',
		  },
		  success: {
			500: '#1e9e6f',
		  },
		},
	  },
	},
	plugins: [],
  }
  