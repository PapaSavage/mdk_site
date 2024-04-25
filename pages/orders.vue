<template>
    <div class="kanban-board">
        <div class="kanban-column" v-for="(column, index) in columns" :key="index">
            <h2 class="kanban-column-title">{{ column.title }}</h2>
            <div class="kanban-column-content">
                <!-- <draggable :list="getOrdersByStatus(column.status)">
            <template #default> -->
                <div v-for="(order, orderIndex) in getOrdersByStatus(column.status)" :key="orderIndex"
                    class="p-2 rounded shadow-sm border-gray-100 border-2">
                    <a href="" class="animate__animated animate__fadeIn" @click.prevent="openModal(order)">
                        <div class="flex justify-between">
                            <h3 class="text-sm mb-3 text-gray-700">Заказ №{{ order.id }}</h3>
                            <p class="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
                                {{ order.status }}
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
                        <div class="sm:flex sm:items-center">
                            <div class="mt-3 sm:mt-0 sm:w-full">
                                <div class="flex justify-between">
                                    <h3 class="text-sm mb-3 text-gray-700">Заказ №{{ selectedOrder.id }}</h3>

                                </div>
                                <div class="mb-4">
                                    <label for="customer_name" class="block text-sm font-medium text-gray-700">Клиент:</label>
                                    <input type="text" id="customer_name" :value="selectedOrder.customer_surname + ' ' + selectedOrder.customer_name + ' ' + selectedOrder.customer_lastname"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                        disabled>
                                </div>
                                <div class="mb-4">
                                    <label for="customer_phone" class="block text-sm font-medium text-gray-700">Номер</label>
                                    <input type="text" id="customer_phone" v-model="selectedOrder.customer_phone" disabled
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out">
                                </div>
                                <div class="mb-4">
                                    <label for="customer_email" class="block text-sm font-medium text-gray-700">Почта</label>
                                    <input type="email" id="customer_email" v-model="selectedOrder.customer_email" disabled
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out">
                                </div>
                                <div class="mb-4">
                                    <label for="category" class="block text-sm font-medium text-gray-700">Статус</label>
                                    <select id="category" v-model="selectedOrder.status"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out">
                                        <option disabled value="">Select a status</option>
                                        <option v-for="column in columns" :key="column.status" :value="column.status"
                                            :selected="column.status === selectedOrder.status">{{ column.title }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-4"  style="max-height: 200px; overflow-y: auto;">
                                    <span class="block text-sm font-medium text-gray-700">Товары</span>
                                    <div class="p-2 rounded shadow-sm border-gray-100 border-2">
                                        <ul>
                                               <li v-for="(item, index) in selectedOrder.goods" :key="index" class="flex justify-between py-3 border-b">
                                                <div>
                                                    <span class="font-medium">{{ item.title }}</span>
                                                    <span class="text-gray-500 text-sm ml-2">{{ item.price }} ₽</span>
                                                    <span class="text-gray-500 text-sm ml-2">x{{ item.quantity }}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex ">
                        <button type="button" @click="saveNewOrder"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm">
                            Save
                        </button>
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
// import draggable from 'vuedraggable';


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
const toast = useToast();

interface Product {
    count: number;
    results: {
        id: number;
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
        id: number;
        customer_surname: string;
        customer_name: string;
        customer_lastname: string;
        customer_phone: string;
        customer_email: string;
        status: string;
        description: string;
        products: string[];
    }[];
}

interface Order_modal {

    id: number;
    customer_surname: string;
    customer_name: string;
    customer_lastname: string;
    customer_phone: string;
    customer_email: string;
    status: string;
    description: string;
    products: string[];
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
// API.get('products/')
//     .then(response => {
//         // Обработка успешного ответа
//         console.log(response.data);
//     })
//     .catch(error => {
//         // Обработка ошибки
//         console.error('Ошибка при выполнении запроса:', error);
//     });
API.get('orders/')
    .then(function (response: any) {
        orders.value = response.data;
        console.log(orders);
        loading.value = false;
    })
    .catch(function (error: any) {
        console.log(error);
    });

// API.get('products/')
// .then(function (response: any) {
//     products.value = response.data;
//         console.log(orders);
//         loading.value = false;
//     })
//     .catch(function (error: any) {
//         console.log(error);
//     });

const getOrdersByStatus = (status: string) => {
    return orders.value.results.filter(order => order.status === status);
}
const selectedOrder = ref<Order_modal | null>(null);

function openModal(order: Order_modal) {
    selectedOrder.value = { ...order };
}



function closeModal() {
    console.log(selectedOrder.value)
    selectedOrder.value = null;
}


const saveNewOrder = () => {
    if (selectedOrder.value) {
        const formData = new FormData();
        formData.append('status', selectedOrder.value.status);
        API.put(`orders/${selectedOrder.value.id}/`, formData)
            .then((response) => {
                toast.add({
                    title: "Изменения были сохранены.",
                    timeout: 1000,
                });
                closeModal();
                location.reload() 
            })
            .catch((error) => {
                toast.add({
                    title: "Произошла ошибка. Изменения не были сохранены.",
                    timeout: 1000,
                    color: "flamingo",
                    ui: { background: "bg-white dark:bg-neutral-900" },
                });
                console.error('Error updating product:', error);
            });
    }
}
const { logout } = actions();
</script>
