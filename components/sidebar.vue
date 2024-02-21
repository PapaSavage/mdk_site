<template>
	<div class="flex flex-col">
		<UVerticalNavigation
			class="w-auto px-5 py-5 h-screen"
			:ui="{}"
			:links="links"
		/>
	</div>
	<UButton label="Open" @click="isOpen = true" />

	<USlideover
		side="left"
		:ui="{
			base: 'relative flex-1 flex flex-col w-full focus:outline-none',
			width: 'max-w-48',
		}"
		v-model="isOpen"
		:transition="true"
	>
		<div class=""></div>
	</USlideover>
</template>
<script setup lang="ts">
const isOpen = ref(false);
const links = [
	{
		label: "Профиль",
		avatar: {
			src: "https://avatars.githubusercontent.com/u/739984?v=4",
		},
		badge: 100,
	},
	{
		label: "Главная",
		icon: "i-heroicons-home",
		to: "/home",
	},
	{
		label: "Настройки",
		icon: "i-heroicons-chart-bar",
		to: `/goods`,
	},
	{
		label: "Dashboard",
		icon: "i-heroicons-command-line",
		to: "/orders",
	},
	{
		label: "Каталог товаров",
		icon: "i-heroicons-command-line",
		to: "/orders",
	},
];
</script>
