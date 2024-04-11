<template>
	<div class="kanban-board">
		<div
    class="kanban-column"
    v-for="(column, index) in columns"
    :key="index"
>
    <h2 class="kanban-column-title">{{ column.title }}</h2>
    <div class="kanban-column-content">
        <!-- <draggable :list="getOrdersByStatus(column.status)">
            <template #default> -->
					<div
						v-for="(order, orderIndex) in getOrdersByStatus(column.status)"
						:key="orderIndex"
						class="p-2 rounded shadow-sm border-gray-100 border-2"
					>
						<a href="" class="animate__animated animate__fadeIn" @click.prevent="openModal(order)">
							<div class="flex justify-between">
								<h3 class="text-sm mb-3 text-gray-700">Заказ</h3>
								<p class="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
									{{order.status}}
								</p>
							</div>
							<div class="flex flex-row items-center mt-2">
								<div class="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
								<a href="#" class="text-xs text-gray-500">{{ order.customer_name }}</a>
							</div>
							<div class="flex flex-row items-center mt-2">
								<div class="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
								<p class="text-xs text-gray-500">{{ order.customer_phone }}</p>
							</div>
							<p class="text-xs text-gray-500 mt-2" v-html="order.description"></p>
						</a>
					</div>
                <!-- </template>
				</draggable> -->
			</div>
		</div>
		<div v-if="selectedOrder" class="fixed z-10 inset-0 overflow-y-auto" @click.self="closeModal">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 sm:mt-0 sm:ml-6 sm:w-1/2">
                                <div class="flex justify-between">
                                <h3 class="text-sm mb-3 text-gray-700">Заказ №{{selectedOrder.id}}</h3>
								<p class="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
									{{selectedOrder.status}}
								</p>
                            </div>
                                <div class="mb-4 ">
                                    <label for="title" class="block text-sm font-medium text-gray-700">Клиент:</label>
                                    <label for="title" class="block text-sm font-medium text-gray-700">{{selectedOrder.customer_name}}</label>
                                </div>
                                <div class="mb-4">
                                    <label for="slug" class="block text-sm font-medium text-gray-700">Номер</label>
                                    <label for="slug" class="block text-sm font-medium text-gray-700">{{selectedOrder.customer_phone}}</label>
                                    <label for="slug" class="block text-sm font-medium text-gray-700">Почта</label>
                                    <label for="slug" class="block text-sm font-medium text-gray-700">{{selectedOrder.customer_email}}</label>
                                </div>
                                <div class="mb-4">
                                    <label for="category"
                                        class="block text-sm font-medium text-gray-700">Товар</label>
                                </div>
                                <div class="mb-4">
                                    <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                                    <input type="number" id="price"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex ">
                        <button type="button" @click="closeModal"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
	</div>
	
</template>

<script setup lang="ts">

import { API } from '~/plugins/axios.js';
import { ref } from 'vue';
import draggable from 'vuedraggable';


definePageMeta({
	layout: "admin",
    middleware: "auth",
});
useHead({ title: "Orders" });

const filteredProducts = ref<Product['results']>([]);
const columns = [
	{ title: "Новые", status: "new" },
	{ title: "В процессе", status: "in_progress" },
	{ title: "Готово", status: "done" },
	{ title: "Отменено", status: "cancelled" },
];

interface Product {
    count: number;
    results: {
        id: string;
        title: string;
        slug: string;
        price: number;
        category: string;
        images: string;
    }[];
}

interface Order {
    count: number;
    results: {
        id: string;
        customer_name: string;
		customer_phone: string;
        customer_email: string;
        status: string;
		description: string;
        products:string[];
    }[];
}

interface Order_modal {

        id: string;
        customer_name: string;
		customer_phone: string;
        customer_email: string;
        status: string;
		description: string;
        products:string[];
    }

const products = ref<Product>({
    count: 0,
    results: []
});
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

API.get('products/')
.then(function (response: any) {
    products.value = response.data;
        console.log(orders);
        loading.value = false;
    })
    .catch(function (error: any) {
        console.log(error);
    });

const getOrdersByStatus = (status: string) => {
    return orders.value.results.filter(order => order.status === status);
}
const selectedOrder = ref<Order_modal | null>(null);

function openModal(order: Order_modal) {
    selectedOrder.value = order;
    filteredProducts.value = products.value.results.filter(product => selectedOrder.value?.products.includes(product.id));
}



function closeModal() {
    selectedOrder.value = null;
}
	
const { logout } = actions();
</script>
