<template>
    <div class="grow grid place-content-center h-screen animate__animated animate__fadeIn">
        <h1 class="text-3xl font-bold">Settings Page</h1>

        <div class="my-4">
            <label for="bot_token" class="block mb-2">Введите токен бота:</label>
            <input id="bot_token" type="text" v-model="user_settings.bot_token"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your bot token">
            <button type="button"
                class="w-full mt-4 px-4 py-2 rounded-md bg-green-600 font-medium text-white hover:bg-green-700"
                @click="set_bot_token">Save</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { doc, updateDoc, getDoc } from "firebase/firestore";

definePageMeta({
    layout: "admin",
    middleware: "auth",
});

useHead({ title: "Settings" });

interface user_settings {
    bot_token: string;
}

const user_settings = ref<user_settings>({
    bot_token: "",
})

const toast = useToast();

const db = useFirestore();
const user = await getCurrentUser();


const get_data = async () => {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);
    user_settings.value.bot_token = docSnap.data()?.bot_token;
    console.log(user_settings.value);
}

get_data();

const set_bot_token = async () => {
    const dataObj = {
        bot_token: user_settings.value.bot_token,
    };
    await updateDoc(doc(db, 'users', user.email), dataObj);
    toast.add({
        title: "Токен бота был успешно обновлен.",
        timeout: 1000,
        callback: () => {
            get_data();
        },
    });
}

const { logout } = actions();
</script>
