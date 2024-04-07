// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "nuxt-vuefire"],
    plugins: ["~/plugins/axios.js"],
    // app: {
    //     pageTransition: { name: "page", mode: "out-in", },
    //     // layoutTransition: { name: "page", mode: "out-in" },
    // },
    colorMode: {
        preference: "light",
    },

    css: ["animate.css", "~/assets/css/tailwind.css", "~/assets/css/style.css"],

    vuefire: {
        auth: { enabled: true, sessionCookie: true },
        config: {
            apiKey: "AIzaSyAb-bQl49JoOqLVBFupnN1VDijWtuRKBiM",
            authDomain: "mdk-site-df4de.firebaseapp.com",
            projectId: "mdk-site-df4de",
            storageBucket: "mdk-site-df4de.appspot.com",
            messagingSenderId: "355269898707",
            appId: "1:355269898707:web:f0803d1381a7b58417ff26",
        },
    },
});
