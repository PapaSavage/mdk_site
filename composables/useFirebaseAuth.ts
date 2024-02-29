import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	getAuth,
} from "firebase/auth";
import { string } from "zod";
export const useFirebaseAuth = () => {
	const { $auth } = useNuxtApp();
	const toast = useToast();
	const register = async (email: string, password: string) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				$auth,
				email,
				password
			);
			var user = userCredential.user;
			console.log(user);
			if (userCredential) {
				toast.add({
					title: "Поздравляю вы зарегистрировались в системе.",
					timeout: 1000,
					callback: () => {
						navigateTo("/login");
					},
				});
			}
		} catch (error) {
			if (String(error).includes("auth/email-already-in-use")) {
				toast.add({
					title: "Такой email уже используется.",
					timeout: 2000,
					color: "flamingo",
					ui: { background: "bg-white dark:bg-neutral-900" },
				});
			}
			console.log(error);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				$auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log(user);
			toast.add({
				title: "Поздравляю - вы авторизовались в системе.",
				timeout: 1000,
				callback: () => {
					navigateTo("/home");
				},
				ui: { background: "bg-white dark:bg-neutral-900" },
			});
		} catch (error) {
			toast.add({
				title: "Неверная почта или пароль.",
				timeout: 2000,
				color: "flamingo",
				ui: { background: "bg-white dark:bg-neutral-900" },
			});
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			await $auth.signOut();
			toast.add({
				title: "Вы вышли из системы.",
				timeout: 1000,
				color: "flamingo",
				callback: () => {
					navigateTo("/login");
				},
				ui: { background: "bg-white dark:bg-neutral-900" },
			});
		} catch (error) {
			console.log(error);
		}
	};

	return {
		register,
		login,
		logout,
	};
};
