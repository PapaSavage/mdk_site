// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ["@nuxt/ui", "@nuxtjs/google-fonts"],
	app: {
		pageTransition: { name: "page", mode: "out-in" },
		// layoutTransition: { name: "page", mode: "out-in" },
	},
	colorMode: {
		preference: "light",
	},

	css: ["animate.css", "~/assets/css/tailwind.css", "~/assets/css/style.css"],
});
