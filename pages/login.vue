<template>
	<UContainer class="grid place-content-center h-screen">
		<div class="flex-col px-6">
			<img
				src="~/assets/img/man.png"
				class="sm:w-64 mx-auto w-32 backdrop-blur-sm animate__animated animate__swing"
				alt=""
			/>

			<div class="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2
					class="text-center text-3xl font-bold my-3 leading-9 tracking-tight"
				>
					Войдите в свой личный аккаунт
				</h2>
			</div>
			<div class="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
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
							:ui="{
								placeholder:
									'placeholder-pale-sky-400 dark:placeholder-pale-sky-500',
							}"
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
							class="grow text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 animate__animated active:from-green-500 active:via-green-600 active:to-green-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] active:shadow-blue-300/50 hover:-translate-y-1 transition ease-in-out hover:scale-110 duration-300"
						>
							Войти
						</button>
					</div>
				</UForm>
				<div class="mt-4 flex flex-row">
					<div class="font-semibold my-auto leading-4">
						<NuxtLink href="register">Нет аккаунта?</NuxtLink>
					</div>
					<NuxtLink
						to="register"
						class="text-center bg-transparent hover:bg-pale-sky-100 my-auto shadow-lg dark:shadow-neutral-700/50 grow text-black-700 font-semibold p-1 border-2 border-pale-sky-900 dark:border-neutral-400 hover:dark:bg-neutral-800 rounded-lg animate__animated hovanimate__swing ml-3"
						>Зарегистрироваться</NuxtLink
					>
				</div>
			</div>
		</div></UContainer
	>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { z } from "zod";

definePageMeta({
    middleware: "already-logged-in",
})

useHead({ title: "Login" });

const schema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Must be at least 6 characters"),
});

const state = reactive({
	email: undefined,
	password: undefined,
});

const {login} = actions();

const handleSubmit = async (event: FormSubmitEvent<any>, state: any) => {
	try {
		await login(state.email, state.password);
	} catch (error) {
		console.log(error);
	}
};
</script>
