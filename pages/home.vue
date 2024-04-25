<template>
    <div class="grow grid place-content-top h-screen">
        <h1 class="page-title">Создание бота в телеграм</h1>
        <div class="image-container">
            <p class="paragraph">1. Для получения токена бота телеграмм, нужно зайти в <a href="https://t.me/BotFather"
                    style="color: blue; text-decoration: underline">телеграмм бота</a>, после чего вызвать бота с
                помощью кнопки "start"</p>
            <img class="animate-slide-in" src="~/assets/img/BotFather.png">
            <p class="paragraph">2. Нажать кнопку "newbot"</p>
            <img class="animate-slide-in" src="~/assets/img/NewBot.png">
            <p class="paragraph">3. После чего нужно придумать имя бота, имя пользователя, которое будет оканчиваться
                "bot"</p>
            <img class="animate-slide-in" src="~/assets/img/NameBot.png">
            <p class="paragraph">4. Поздравляю создан токен бота</p>
            <img class="animate-slide-in" src="~/assets/img/Token.png">
        </div>
    </div>
</template>

<style scoped>
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
    margin-top: 40px;
}

.image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    opacity: 0;
    max-width: 40%;
    max-height: 100xp;
    height: auto;
}

.animate-slide-in {
    animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
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
