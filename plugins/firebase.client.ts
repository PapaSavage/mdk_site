import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
	// Import the functions you need from the SDKs you need
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyAb-bQl49JoOqLVBFupnN1VDijWtuRKBiM",
		authDomain: "mdk-site-df4de.firebaseapp.com",
		projectId: "mdk-site-df4de",
		storageBucket: "mdk-site-df4de.appspot.com",
		messagingSenderId: "355269898707",
		appId: "1:355269898707:web:f0803d1381a7b58417ff26",
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	return {
		provide: { auth },
	};
});
