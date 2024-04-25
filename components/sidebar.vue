<template>
    <div class="transition-transform hidden sm:block px-5 py-5">
        <div class="flex flex-col justify-between h-full">
            <UVerticalNavigation class="" :ui="{
                size: 'sm:text-sm md:text-base',
                active: 'text-pale-sky-900 dark:text-white before:bg-pale-sky-200 dark:before:bg-pale-sky-800',
                inactive:
                    'text-pale-sky-500 dark:text-pale-sky-400 hover:text-pale-sky-900 dark:hover:text-white hover:before:bg-pale-sky-50 dark:hover:before:bg-pale-sky-800/50',
            }" :links="links" />
            <button type="submit" @click="logout"
                class="h-9 text-white active:bg-pale-sky-900 hover:bg-pale-sky-800 bg-pale-sky-900 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold border-2 border-pale-sky-900 dark:border-neutral-100 hover:dark:bg-neutral-200 dark:bg-neutral-50 dark:text-black active:dark:bg-neutral-50 rounded-lg">
                Выйти
            </button>
        </div>
    </div>
    <USlideover side="left" :ui="{
                base: 'relative flex-1 flex flex-col w-full focus:outline-none',
                width: '',
                background: 'bg-white dark:bg-pale-sky-900',
                overlay: {
                    background: 'bg-pale-sky-200/75 dark:bg-pale-sky-800/75',
                },
            }" v-model="isOpen" :transition="true">
        <div @click="closeOpen" class="flex flex-col justify-between h-full m-3 mx-3">
            <UVerticalNavigation class="" :ui="{
                size: 'text-lg',
                active: 'text-pale-sky-900 dark:text-white before:bg-pale-sky-100 dark:before:bg-pale-sky-800',
            }" :links="links" />
            <button type="submit" @click="logout"
                class="h-9 text-white active:bg-pale-sky-900 hover:bg-pale-sky-800 bg-pale-sky-900 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold border-2 border-pale-sky-900 dark:border-neutral-100 hover:dark:bg-neutral-200 dark:bg-neutral-50 dark:text-black active:dark:bg-neutral-50 rounded-lg">
                Выйти
            </button>
        </div>
    </USlideover>
    <UButton :icon="'i-heroicons-bars-3-16-solid'" color="gray" variant="ghost" aria-label="Theme"
        @click="isOpen = true" class="absolute z-50 sm:hidden top-0 left-0" />
</template>
<script setup lang="ts">
import { ProviderId } from 'firebase/auth';

const user = useCurrentUser();
const isOpen = ref(false);
const links = [
    {
        label: user.value?.displayName,
        avatar: {
            // src: "https://avatars.githubusercontent.com/u/739984?v=4",
        },
        to: "/profile",
        badge: 100,
        click: closeOpen,
    },
    {
        label: "Главная",
        icon: "i-heroicons-home",
        to: "/home",
        click: closeOpen,
    },
    {
        label: "Настройки",
        icon: "i-heroicons-chart-bar",
        to: `/settings`,
        click: closeOpen,
    },
    {
        label: "Заказы",
        icon: "i-heroicons-shopping-bag-solid",
        to: "/orders",
        click: closeOpen,
    },
    {
        label: "Каталог товаров",
        icon: "i-heroicons-clipboard-document-list",
        to: "/goods",
        click: closeOpen,
    },
];

const { logout } = actions();
function closeOpen() {
    isOpen.value = false;
}
</script>
