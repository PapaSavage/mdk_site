<template>
	<div class="transition-transform hidden sm:block px-5 py-5">
		<div class="flex flex-col justify-between h-full">
			<UVerticalNavigation class="" :ui="{}" :links="links" />
			<button
				type="submit"
				@click="logout"
				class="text-white bg-gradient-to-r from-flamingo-400 via-flamingo-500 to-flamingo-600 hover:bg-gradient-to-br focus:outline-none focus:ring-flamingo-300 dark:focus:ring-flamingo-800 shadow-lg shadow-flamingo-500/50 dark:shadow-lg dark:shadow-flamingo-800/80 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 animate__animated active:from-flamingo-500 active:via-flamingo-600 active:to-flamingo-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] active:shadow-blue-300/50 hover:-translate-y-1 transition ease-in-out hover:scale-110 duration-300"
			>
				Выйти
			</button>
		</div>
	</div>
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
	<UButton
		:icon="'i-heroicons-bars-3-16-solid'"
		color="gray"
		variant="ghost"
		aria-label="Theme"
		@click="isOpen = true"
		class="absolute sm:hidden top-0 left-0"
	/>
	<UButton label="Open" @click="isOpen = true" />
</template>
<script setup lang="ts">
const isOpen = ref(false);
const links = [
	{
		label: "Профиль",
		avatar: {
			src: "https://avatars.githubusercontent.com/u/739984?v=4",
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
		to: `/goods`,
		click: closeOpen,
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
		click: closeOpen,
	},
];

const { logout } = useFirebaseAuth();
function closeOpen() {
	isOpen.value = false;
}
</script>
