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
                    :class="{ 'bg-pale-sky-300 dark:bg-pale-sky-600': category.id === selectedCategory }">
                    {{ category.title }}
                </button>
            </div>
            <ul>
                <div class=" mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <div v-for="product in filteredProducts" :key="product.id" class="group relative">
                        <a href="" class="animate__animated animate__fadeIn">
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



interface Product {
    count: number;
    results: {
        id: string;
        title: string;
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

const { logout } = actions();
</script>