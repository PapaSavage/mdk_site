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
	<UButton
		:icon="'i-heroicons-bars-3-16-solid'"
		color="gray"
		variant="ghost"
		aria-label="Theme"
		@click="isOpen = true"
		class="absolute sm:hidden top-0 left-0"
	/>
	<USlideover
		v-model="isOpen"
		side="left"
		:overlay="false"
		:ui="{
			background: 'bg-pale-sky-50 dark:bg-neutral-900',

			width: 'max-w-48',
			rounded: 'rounded-lg',
		}"
	>
		<UVerticalNavigation
			class="px-5 py-5"
			:ui="{
				base: 'group relative flex items-center gap-1.5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-pale-sky-500 dark:focus-visible:before:ring-bg-pale-sky--400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75',
				active: 'text-pale-sky-900 dark:text-white before:bg-pale-sky-100 dark:before:bg-pale-sky-800',
				inactive:
					'text-pale-sky-500 dark:text-pale-sky-400 hover:text-pale-sky-800    dark:hover:text-white hover:before:bg-pale-sky-50 dark:hover:before:bg-pale-sky-800/50',
				ring: '',
			}"
			:links="links"
		/>
	</USlideover>
</template>
<script setup lang="ts">
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
		icon: "i-heroicons-home-20-solid",
		to: "/home",
		click: closeOpen,
	},
	{
		label: "Настройки",
		icon: "i-heroicons-cog-16-solid",
		to: "/settings",
		click: closeOpen,
	},
	{
		label: "Товары",
		icon: "i-heroicons-chart-bar",
		to: `/goods`,
		click: closeOpen,
	},
	{
		label: "Заказы",
		icon: "i-heroicons-command-line",
		to: "/orders",
		click: closeOpen,
	},
];

const { logout } = useFirebaseAuth();
const isOpen = ref(false);
function closeOpen() {
	isOpen.value = false;
}
</script>
