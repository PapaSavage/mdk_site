<template>
    <div class="grow grid place-content-top h-screen">
        <h1 class="page-title">Создание бота в телеграм</h1>
        <div class="grow grid place-content-top h-screen">
            <p class=" paragraph"> 1. Для получения токена бота телеграмм, нужно зайти в <a
                    href="https://t.me/BotFather" style="color: blue; text-decoration: underline">телеграмм бота</a>,
                после чего вызвать бота с помощью кнопки "start"</p>
            <img src="~/assets/img/BotFather.png">
            <p>ыыы</p>
        </div>
    </div>
</template>

<style>
.page-title {
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 32px;
}

.paragraph {
    text-align: center;
    font-size: 16px;
    color: #333;
}

img {
    display: block;
    margin: -100px auto 0px;
    max-width: 100%;
    height: auto;
}
</style>

<script setup lang="ts">
definePageMeta({
    layout: "admin",
    middleware: "auth",
});

useHead({ title: "Home" });

const { logout } = actions();
</script>
