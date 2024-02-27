<template>
	<UContainer class="text-4xl text-center grid place-content-center h-screen">
		<h1>MAIN PAGE</h1>
		<NuxtLink
			to="login"
			class="text-center text-lg bg-transparent my-4 p-1 hover:bg-mountain-500 text-black-700 font-bold hover:font-medium hover:text-white border-4 border-mountain-500 hover:border-transparent rounded-lg"
			>Войти
		</NuxtLink>
	</UContainer>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "default",
	title: "welcome",
});
useHead({ title: "Welcome" });
</script>
