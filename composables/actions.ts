import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    getAuth,
} from "firebase/auth";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";



export const actions = () => {
    const auth = useFirebaseAuth();
    const toast = useToast();
    const db = useFirestore();

    const register = async (email: string, password: string, nickname: string) => {

        try {
            toast.add({
                title: "Происходит попытка регистрации в систему.",
                timeout: 2000,
                color: "pale-sky",
                actions: [
                    {
                        label: "loading",
                        loading: true,
                    }
                ],
                closeButton: {
                    label: "",
                    icon: ""
                },
                ui: { background: "bg-white dark:bg-neutral-900" },
            });
            const { user } = await createUserWithEmailAndPassword(
                auth!,
                email,
                password
            );
            if (user) {

                const dataObj = {
                    uid: user.uid,
                    email: email,
                    nickname: nickname,
                    bot_token: "",
                };
                const docRef = await setDoc(doc(db, 'users', email), dataObj)
                await updateProfile(user, { displayName: nickname });
                toast.add({
                    title: "Поздравляю вы зарегистрировались в системе.",
                    timeout: 1000,
                    callback: () => {
                        navigateTo("/login");
                    },
                });
            }
        } catch (error: any) {
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
            toast.add({
                title: "Происходит попытка входа в систему.",
                timeout: 2000,
                color: "pale-sky",
                actions: [
                    {
                        label: "loading",
                        loading: true,
                    }
                ],
                closeButton: {
                    label: "",
                    icon: ""
                },
                ui: { background: "bg-white dark:bg-neutral-900" },
            });
            const userCredential = await signInWithEmailAndPassword(
                auth!,
                email,
                password
            );
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
            await auth!.signOut();
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
