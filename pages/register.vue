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
					Зарегистрируйте свой личный аккаунт
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

					<UButton
						type="submit"
						color="black"
						size="md"
						variant="solid"
						:ui="{
							rounded: 'rounded-xl',
						}"
						block
					>
						Зарегистрироваться
					</UButton>
				</UForm>
				<div class="mt-4 flex flex-row">
					<div class="font-semibold my-auto">
						<a href="">Уже есть аккаунт?</a>
					</div>
					<button
						class="bg-transparent grow hover:bg-mountain-500 text-black-700 font-bold hover:font-medium hover:text-white h-9 border-4 border-mountain-500 hover:border-transparent rounded-lg animate__animated hovanimate__swing ml-3"
					>
						Войти
					</button>
				</div>
			</div>
		</div></UContainer
	>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { z } from "zod";

type Schema = z.output<typeof schema>;
const { register } = useFirebaseAuth();

const schema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Must be at least 6 characters"),
});

const state = reactive({
	email: undefined,
	password: undefined,
});

const toast = useToast();
const handleSubmit = async (event: FormSubmitEvent<any>, state: any) => {
	try {
		await register(state.email, state.password);
		toast.add({
			title: "Поздравляю вы зарегистрировались в системе.",
			callback: () => {
				navigateTo("/login");
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
</script>
