<template>
	<UButton
		:icon="
			isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
		"
		color="gray"
		variant="ghost"
		aria-label="Theme"
		@click="isDark = !isDark"
		class="absolute"
	/>
	<UContainer class="grid place-content-center h-screen">
		<div class="flex-col px-6">
			<img
				src="~/assets/img/man.png"
				class="sm:w-64 mx-auto w-32 animate__animated animate__swing"
				alt=""
			/>

			<div class="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
				<h2
					class="text-center text-3xl font-bold leading-9 tracking-tight"
				>
					Войдите в свой личный аккаунт
				</h2>
			</div>
			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb-10">
				<UForm
					:schema="schema"
					:state="state"
					class="space-y-4"
					@submit="handleSubmit($event, state)"
				>
					<UFormGroup label="Электронная почта" name="email">
						<UInput
							v-model="state.email"
							placeholder="example@domain.com"
							color="pale-sky"
							class="font-bold"
						/>
					</UFormGroup>

					<UFormGroup label="Пароль" name="password">
						<UInput
							v-model="state.password"
							type="password"
							placeholder=""
							color="pale-sky"
							class="font-semibold"
						/>
					</UFormGroup>
					<div class="flex flex-row">
						<button
							type="submit"
							class="grow text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 animate__animated dark:active:"
						>
							Войти
						</button>
					</div>
				</UForm>
				<div class="mt-4 flex flex-row">
					<div class="font-semibold my-auto">
						<a href="">Нет аккаунта?</a>
					</div>
					<button
						class="bg-transparent grow hover:bg-pale-sky-950 text-black-700 font-semibold hover:font-bold hover:text-white h-9 border-2 border-pale-sky-900 dark:border-mountain-600 hover:border-transparent rounded-lg animate__animated hovanimate__swing ml-3"
					>
						Зарегистрироваться
					</button>
				</div>
			</div>
		</div></UContainer
	>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Must be at least 6 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
	email: undefined,
	password: undefined,
});

const { register, login } = useFirebaseAuth();
const handleSubmit = async (event: FormSubmitEvent<any>, state: any) => {
	try {
		await login(state.email, state.password);
		toast.add({
			title: "Поздравляю - вы авторизовались в системе.",
			callback: () => {
				navigateTo("/admin");
			},
		});
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

const toast = useToast();
</script>
