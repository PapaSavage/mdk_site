<template>
    <UContainer class=" text-xl max-w-xl text-center my-auto place-content-center h-screen">
        <h1 class="text-4xl font-bold">Добро пожаловать в наш магазин конструктора интернет магазина в telegram!</h1>
        <p class='py-4'>Создайте своего персонального телеграм-бота всего в несколько кликов.</p>
        <NuxtLink to="login"
            class="rounded-lg bg-mountain-600 text-sm font-semibold text-white shadow-sm hover:bg-mountain-500
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mountain-600 px-5 py-2">
            Войти
        </NuxtLink>
    </UContainer>
    <div class="absolute bg-repeat h-screen her"></div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: "already-logged-in",
});

useHead({ title: "Welcome" });
</script>

<style></style>