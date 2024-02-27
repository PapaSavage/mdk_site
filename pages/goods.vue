<template>
	<div class="grow grid place-content-center h-screen">
		<h1 class="text-3xl font-bold">Goods Page</h1>

		<button @click="logout" class="">Выйти из системы</button>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "admin",
});
useHead({ title: "Goods" });

const { logout } = useFirebaseAuth();
</script>
