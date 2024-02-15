<template>
	<div class="flex flex-col">
		<UVerticalNavigation
			class="w-auto px-5 py-5 h-screen"
			:ui="{}"
			:links="links"
		/>
	</div>
</template>
<script setup lang="ts">
const links = [
	{
		label: "Profile",
		avatar: {
			src: "https://avatars.githubusercontent.com/u/739984?v=4",
		},
		badge: 100,
	},
	{
		label: "Home",
		icon: "i-heroicons-home",
		to: "/home",
	},
	{
		label: "Goods",
		icon: "i-heroicons-chart-bar",
		to: `/goods`,
	},
	{
		label: "Orders",
		icon: "i-heroicons-command-line",
		to: "/orders",
	},
];
</script>
