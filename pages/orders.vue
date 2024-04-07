<template>
	<div class="kanban-board">
		<div
			class="kanban-column"
			v-for="(column, index) in columns"
			:key="index"
		>
			<h2 class="kanban-column-title">{{ column.title }}</h2>
			<div class="kanban-column-content">
				<div
					v-for="(order, orderIndex) in getOrdersByStatus(column.status)"
					:key="orderIndex"
					class="p-2 rounded shadow-sm border-gray-100 border-2"
				>
					<h3 class="text-sm mb-3 text-gray-700">№{{ order.id }} {{ order.title }}</h3>
					<p class="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
						{{ order.status }}
					</p>
					<div class="flex flex-row items-center mt-2">
						<div class="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
						<a href="#" class="text-xs text-gray-500">ляля</a>
					</div>
					<p class="text-xs text-gray-500 mt-2">ляля</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { API } from '~/plugins/axios.js';
import { ref } from 'vue';

definePageMeta({
	layout: "admin",
    middleware: "auth",
});
useHead({ title: "Orders" });

const columns = [
	{ title: "Новые", status: "new" },
	{ title: "В процессе", status: "in_progress" },
	{ title: "Готово", status: "done" },
	{ title: "Отменено", status: "cancelled" },
];
const tasks = [
	{ id: 1, title: "Task 1", status: "new" },
	{ id: 2, title: "Task 2", status: "in_progress" },
	{ id: 3, title: "Task 3", status: "done" },
	{ id: 4, title: "Task 4", status: "cancelled" },
	{ id: 5, title: "Task 5", status: "cancelled" },
];

interface Order {
    count: number;
    results: {
        id: string;
        name: string;
        status: number;
    }[];
}

const orders = ref<Order>({
    count: 0,
    results: []
});

const loading = ref(true);

API.get('orders/')
    .then(function (response: any) {
        orders.value = response.data;
        console.log(orders);
        loading.value = false;
    })
    .catch(function (error: any) {
        console.log(error);
    });


	const getOrdersByStatus = (status) => {
    return tasks.filter(task => task.status === status);
}
	
const { logout } = actions();
</script>
