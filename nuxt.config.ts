// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui"],

	colorMode: {
		preference: "light",
	},

	css: ["animate.css", "@/assets/css/tailwind.css"],
});
