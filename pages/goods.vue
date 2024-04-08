<template>
    <div class="grow h-screen overflow-y-auto p-4">
        <div v-if="loading" class="flex justify-center items-center h-full animate__animated animate__fadeIn">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
        <div v-else class="">
            <div class="flex flex-wrap">
                <button v-for="category in categories.results" :key="category.id"
                    @click="selectedCategory = category.id"
                    class="text-center bg-transparent hover:bg-pale-sky-400 my-auto shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold p-1 border-2 border-pale-sky-900 dark:border-neutral-400 hover:dark:bg-neutral-800 rounded-lg animate__animated hovanimate__swing ml-3 mb-3"
                    :class="{ 'bg-neutral-300 dark:bg-pale-sky-600': category.id === selectedCategory }">
                    {{ category.title }}
                </button>
            </div>
            <ul>
                <div class=" mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <div v-for="product in filteredProducts" :key="product.id" class="group relative">
                        <a href="" class="animate__animated animate__fadeIn" @click.prevent="openModal(product)">
                            <div
                                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                                <img :src="product.images" class="" />
                            </div>
                            <div class="mt-4 flex justify-between">
                                <div>
                                    <h3 class="text-md font-bold ">
                                        <span aria-hidden="true" class="absolute inset-0" />
                                        {{ product.title }}
                                    </h3>
                                </div>
                                <p class="text-md font-medium">${{ product.price }}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </ul>
        </div>

        <div v-if="selectedProduct" class="fixed z-10 inset-0 overflow-y-auto" @click.self="closeModal">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 sm:mt-0 sm:w-1/2">
                                <img :src="selectedProduct.images" class="w-full" />
                            </div>
                            <div class="mt-3 sm:mt-0 sm:ml-6 sm:w-1/2">
                                <div class="mb-4">
                                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" id="title" v-model="selectedProduct.title"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                </div>
                                <div class="mb-4">
                                    <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
                                    <input type="text" id="slug" v-model="selectedProduct.slug"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div class="mb-4">
                                    <label for="category"
                                        class="block text-sm font-medium text-gray-700">Category</label>
                                    <select id="category" v-model="selectedProduct.category"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option disabled value="">Select a category</option>
                                        <option v-for="category in categories.results" :key="category.id"
                                            :value="category.id">{{ category.title }}</option>
                                    </select>
                                </div>
                                <div class="mb-4">
                                    <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                                    <input type="number" id="price" v-model.number="selectedProduct.price"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="saveModalChanges"
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


definePageMeta({
    layout: "admin",
    middleware: "auth",
});
useHead({ title: "Goods" });



interface Product_modal {
    id: string;
    title: string;
    slug: string;
    price: number;
    category: string;
    images: string;
}

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
interface Category {
    count: number;
    results: {
        id: string;
        title: string;
    }[];
}

const products = ref<Product>({
    count: 0,
    results: []
});

const categories = ref<Category>({
    count: 0,
    results: []
});

const selectedCategory = ref('');

const loading = ref(true);
const filteredProducts = ref<Product['results']>([]);

const toast = useToast();

get_data();

function get_data() {
    Promise.all([
        API.get('categories/'),
        API.get('products/')
    ])
        .then(function ([categoriesResponse, productsResponse]: any) {
            categories.value = categoriesResponse.data;
            products.value = productsResponse.data;

            if (categories.value.results.length > 0) {
                selectedCategory.value = categories.value.results[0].id;
                filterProducts();
            } else {
                filteredProducts.value = products.value.results;
            }

            loading.value = false;
        })
        .catch(function (error: any) {
            console.log(error);
        });
}


function filterProducts() {
    if (selectedCategory.value === '') {
        filteredProducts.value = products.value.results;
    } else {
        filteredProducts.value = products.value.results.filter(product =>
            product.category.toLowerCase() === selectedCategory.value.toLowerCase()
        );
    }
}

watch(selectedCategory, (newValue) => {
    if (newValue === '') {
        filteredProducts.value = products.value.results;
    } else {
        filteredProducts.value = products.value.results.filter(product =>
            product.category.toLowerCase() === newValue.toLowerCase()
        );
    }
});

const selectedProduct = ref<Product_modal | null>(null);

function openModal(product: Product_modal) {
    selectedProduct.value = { ...product };
}

function closeModal() {
    selectedProduct.value = null;
}

const saveModalChanges = () => {
    if (selectedProduct.value) {
        API.put(`products/${selectedProduct.value.id}/`, selectedProduct.value)
            .then((response) => {
                console.log('Product updated:', response.data);
                toast.add({
                    title: "Изменения были сохранены.",
                    timeout: 1000,
                    callback: () => {
                        get_data();
                    },
                });
                closeModal();
            })
            .catch((error) => {
                toast.add({
                    title: "Произошла ошибка. Изменения не были сохранены.",
                    timeout: 1000,
                    callback: () => {
                        get_data();
                    },
                    color: "flamingo",
                    ui: { background: "bg-white dark:bg-neutral-900" },
                });
                console.error('Error updating product:', error);
            });
    }
};


const { logout } = actions();
</script>