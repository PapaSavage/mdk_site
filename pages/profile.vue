<template>
    <div class="grow grid place-content-center">

        <div class="flex flex-col items-center">

            <!-- <img class="rounded-full" src="https://avatars.githubusercontent.com/u/739984?v=4" alt=""> -->
            <div class="text-3xl">{{ user?.displayName }}</div>
        </div>

        <!-- <div class="grid grid-cols-3 h-screen p-5 md:grid-rows-3 lg:grid-rows-8  sm:text-md md:text-xl lg:text-2xl">
            <div
                class="flex flex-row items-center justify-between text-black hover:bg-pale-sky-50 bg-pale-sky-100 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold dark:border-neutral-100 hover:dark:bg-neutral-800/75 dark:text-white dark:bg-pale-sky-800 rounded-3xl m-4 p-6">
                <div class="">Количество заказов</div>
                <div class="text-3xl">5</div>
            </div>
            <div
                class="flex flex-row items-center justify-between text-black hover:bg-pale-sky-50 bg-pale-sky-100 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold dark:border-neutral-100 hover:dark:bg-neutral-800/75 dark:text-white dark:bg-pale-sky-800 rounded-3xl m-4 p-6">
                Продаж
            </div>
            <div
                class="flex flex-row items-center justify-between text-black hover:bg-pale-sky-50 bg-pale-sky-100 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold dark:border-neutral-100 hover:dark:bg-neutral-800/75 dark:text-white dark:bg-pale-sky-800 rounded-3xl m-4 p-6">
                Товаров
            </div>
            <div
                class="text-black col-span-2 row-span-7 hover:bg-pale-sky-50 bg-pale-sky-100 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold dark:border-neutral-100 hover:dark:bg-neutral-800/75 dark:text-white dark:bg-pale-sky-800 rounded-3xl m-4 p-6">
                Диаграмма/Гистограмма
            </div>
            <div
                class="text-black row-span-7 hover:bg-pale-sky-50 bg-pale-sky-100 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold dark:border-neutral-100 hover:dark:bg-neutral-800/75 dark:text-white dark:bg-pale-sky-800 rounded-3xl m-4 p-6">
                5
            </div>
        </div> -->
    </div>


</template>

<script setup lang="ts">

const user = useCurrentUser();

console.log(user);



definePageMeta({
    layout: "admin",
    middleware: "auth",
});

useHead({ title: "Profile" });

const { logout } = actions();
</script>
