<template>
	<ClientOnly>
		<UButton
			:icon="
				isDark
					? 'i-heroicons-moon-20-solid'
					: 'i-heroicons-sun-20-solid'
			"
			color="gray"
			variant="ghost"
			aria-label="Theme"
			@click="isDark = !isDark"
		/>
		<template #fallback>
			<div class="w-8 h-8" />
		</template>
	</ClientOnly>
	<div
		class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
	>
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<h2
				class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight"
			>
				Sign in to your account
			</h2>
		</div>
		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<UForm
				:validate="validate"
				:state="state"
				class="space-y-4"
				@submit="handleSubmit"
			>
				<UFormGroup label="Электронная почта" name="email">
					<UInput
						v-model="state.email"
						placeholder="example@domain.com"
					/>
				</UFormGroup>

				<UFormGroup label="Пароль" name="password">
					<UInput
						v-model="state.password"
						type="password"
						placeholder=""
					/>
				</UFormGroup>

				<UButton type="submit" class="block"> Submit </UButton>
			</UForm>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
	email: undefined,
	password: undefined,
});

const validate = (state: any): FormError[] => {
	const errors = [];
	if (!state.email) errors.push({ path: "email", message: "Required" });
	if (!state.password) errors.push({ path: "password", message: "Required" });
	return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
	// Do something with data
	console.log(event.data);
}

import { createUserWithEmailAndPassword } from "firebase/auth";

const { $auth } = useNuxtApp();

const handleSubmit = async (event: FormSubmitEvent<any>, state: any) => {
	try {
		const res = await createUserWithEmailAndPassword(
			$auth,
			state.email,
			state.password
		);
		console.log(res);
	} catch (error) {
		console.log(error);
	}
};
const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === "dark";
	},
	set() {
		colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
	},
});
</script>
