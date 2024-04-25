<template>
    <div class="grow grid h-screen animate__animated animate__fadeIn text-lg">
        <div class="my-auto mx-auto">

            <img src="~/assets/img/storesettings.png"
                class="sm:w-32 mx-auto w-16 backdrop-blur-sm animate__animated animate__swing" alt="" />
            <h1 class="text-3xl font-bold text-center mb-10">Settings Page</h1>

            <div class="my-1">
                <label for="bot_token" class="block mb-2 font-bold">Токен бота</label>
                <input id="bot_token" type="text" v-model="user_settings.bot_token"
                    class="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your bot token">
            </div>
            <div class="my-1">
                <label for="bot_token" class="block mb-2 font-bold">Название магазина</label>
                <input id="bot_token" type="text" v-model="user_settings.name_store"
                    class="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter store name">
            </div>
            <div class="my-2">
                <label for="bot_token" class="block mb-2 font-bold">Адрес магазина</label>
                <input id="bot_token" type="text" v-model="user_settings.address"
                    class="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address">
            </div>
            <label v-if="user_settings.status" for="status"
                class="block mb-2 font-bold text-sm text-mountain-500">Интернет
                магазин
                запущен.</label>
            <label v-else for="status" class="block mb-2 text-sm font-bold text-flamingo-400">Интернет магазин не
                запущен.</label>
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
    address: string;
    name_store: string;
    status: boolean;
}

const user_settings = ref<user_settings>({
    bot_token: "",
    address: "",
    name_store: "",
    status: false
})

const toast = useToast();

const db = useFirestore();
const user = await getCurrentUser();


const get_data = async () => {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);
    user_settings.value.bot_token = docSnap.data()?.bot_token;
    user_settings.value.address = docSnap.data()?.address;
    user_settings.value.name_store = docSnap.data()?.name_store;
    user_settings.value.status = docSnap.data()?.status;
    console.log(user_settings.value);
}

get_data();

const set_bot_token = async () => {
    const dataObj = {
        bot_token: user_settings.value.bot_token,
        address: user_settings.value.address,
        name_store: user_settings.value.name_store,
    };
    await updateDoc(doc(db, 'users', user.email), dataObj);
    toast.add({
        title: "Настройки были обновлены.",
        timeout: 1000,
        callback: () => {
            get_data();
        },
    });
}

const { logout } = actions();
</script>
