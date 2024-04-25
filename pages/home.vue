<template>
    <div class="grow grid h-screen animate__animated animate__fadeIn text-lg overflow-y-auto">
        <div class="my-auto mx-auto text-center">

            <h1 class="py-10 text-5xl font-bold">Создание бота в телеграм</h1>
            <div class="text-xl">
                <p class="py-4">1. Для получения токена бота телеграмм, нужно зайти в <a href="https://t.me/BotFather">
                        телеграмм
                        бота</a>, после чего вызвать бота с
                    помощью кнопки "start"</p>
                <img class=" mx-auto" src="~/assets/img/BotFather.png">
                <p class="py-4">2. Нажать кнопку "newbot"</p>
                <img class="animate-slide-in  mx-auto" src="~/assets/img/NewBot.png">
                <p class="paragraph">3. После чего нужно придумать имя бота, имя пользователя, которое будет
                    оканчиваться
                    "bot"</p>
                <img class="animate-slide-in  mx-auto" src="~/assets/img/NameBot.png">
                <p class="py-4">4. Поздравляю создан токен бота</p>
                <img class="animate-slide-in" src="~/assets/img/Token.png">
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    layout: "admin",
    middleware: "auth",
});

useHead({ title: "Home" });

const { logout } = actions();
</script>
