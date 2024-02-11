<template>
	<div>
		<h1>Register</h1>
		<form @submit.prevent="handleSubmit()" action="">
			<input type="email" placeholder="email" v-model="email" />
			<input type="password" placeholder="password" v-model="password" />
			<button type="submit">Register</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");

const { $auth } = useNuxtApp();

const handleSubmit = async () => {
	try {
		const res = await createUserWithEmailAndPassword(
			$auth,
			email.value,
			password.value
		);
		console.log(res);
	} catch (error) {
		console.log(error);
	}
};
</script>
