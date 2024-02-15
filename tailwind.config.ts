import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
	theme: {
		extend: {
			colors: {
				flamingo: {
					DEFAULT: "#EF4444",
					50: "#FDEDED",
					100: "#FCDADA",
					200: "#F9B5B5",
					300: "#F58F8F",
					400: "#F26A6A",
					500: "#EF4444",
					600: "#E71414",
					700: "#B30F0F",
					800: "#800B0B",
					900: "#4C0707",
					950: "#320404",
				},
				mountain: {
					DEFAULT: "#10B981",
					50: "#8CF5D2",
					100: "#79F3CB",
					200: "#53F0BC",
					300: "#2EEDAE",
					400: "#13DF9B",
					500: "#10B981",
					600: "#0C855D",
					700: "#075239",
					800: "#031E15",
					900: "#000000",
					950: "#000000",
				},
				"pale-sky": {
					DEFAULT: "#6B7280",
					50: "#fafafa",
					100: "#f5f5f5",
					200: "#e5e5e5",
					300: "#d4d4d4",
					400: "#a3a3a3",
					500: "#737373",
					600: "#525252",
					700: "#404040",
					800: "#262626",
					900: "#171717",
					950: "#0a0a0a",
				},
			},
		},
	},
	content: [
		`/components/**/*.{vue,js,ts}`,
		`/layouts/**/*.vue`,
		`/pages/**/*.vue`,
		`/composables/**/*.{js,ts}`,
		`/plugins/**/*.{js,ts}`,
		`/utils/**/*.{js,ts}`,
		`/App.{js,ts,vue}`,
		`/app.{js,ts,vue}`,
		`/Error.{js,ts,vue}`,
		`/error.{js,ts,vue}`,
		`/app.config.{js,ts}`,
	],
};
