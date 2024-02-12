<template>
	<UContainer class="grid place-content-center h-screen">
		<h1 class="text-3xl font-bold">Admin Page</h1>

		<UButton @click="logout" class="text-center">Выйти из системы</UButton>
		<button @click="logout" class="">Выйти из системы</button>
	</UContainer>
</template>

<script setup lang="ts">
const { logout } = useFirebaseAuth();
</script>
