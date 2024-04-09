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
            <div class="fixed bottom-4 right-4">
                <button @click="openAddProductModal"
                    class=" text-white active:bg-pale-sky-900 hover:bg-pale-sky-800 bg-pale-sky-900 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold border-2 border-pale-sky-900 dark:border-neutral-100 hover:dark:bg-neutral-200 dark:bg-neutral-50 dark:text-black active:dark:bg-neutral-50 rounded-lg px-4 py-1 animate__animated animate__fadeIn">
                    Добавить товар
                </button>
            </div>
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
                        <div class="sm:flex sm:items-center">
                            <div class="mt-3 sm:mt-0 sm:w-1/2 flex justify-center items-center">
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
                                <div class="mb-4">
                                    <label for="image"
                                        class="block text-sm font-medium text-gray-700">Изображение</label>
                                    <input type="file" id="image" @change="handleImageUpload" class="mt-1 block w-full">
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
                        <button type="button" @click="deleteproduct"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-flamingo-600 text-base font-medium text-white hover:bg-flamingo-700 sm:ml-3 sm:w-auto sm:text-sm">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="addProductModalOpen" class="fixed z-10 inset-0 overflow-y-auto" @click.self="closeModal">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-center">
                            <div class="mt-3 sm:mt-0 sm:w-1/2 flex justify-center items-center">
                                <img src="" class="w-full" alt="Фото" />
                            </div>
                            <div class="mt-3 sm:mt-0 sm:ml-6 sm:w-1/2">
                                <div class="mb-4">
                                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" id="title" v-model="newProduct.title"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                </div>
                                <div class="mb-4">
                                    <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
                                    <input type="text" id="slug" v-model="newProduct.slug"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div class="mb-4">
                                    <label for="category"
                                        class="block text-sm font-medium text-gray-700">Category</label>
                                    <select id="category" v-model="newProduct.category"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option disabled value="">Select a category</option>
                                        <option v-for="category in categories.results" :key="category.id"
                                            :value="category.id">{{ category.title }}</option>
                                    </select>
                                </div>
                                <div class="mb-4">
                                    <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                                    <input type="number" id="price" v-model="newProduct.price"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                </div>
                                <div class="mb-4">
                                    <label for="image"
                                        class="block text-sm font-medium text-gray-700">Изображение</label>
                                    <input type="file" id="image" @change="" class="mt-1 block w-full">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="saveNewProduct"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm">
                            Add
                        </button>
                        <button type="button" @click="closeAddProductModal"
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

const selectedCategory = ref('');

const loading = ref(true);
const filteredProducts = ref<Product['results']>([]);
const addProductModalOpen = ref(false);
const selectedProduct = ref<Product_modal | null>(null);

const toast = useToast();


interface Product_modal {
    id: string;
    title: string;
    slug: string;
    price: number;
    category: string;
    images: string;
}

interface new_product {
    title: string;
    slug: string;
    price: number;
    category: string;
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

const newProduct = ref<new_product>({
    title: '',
    slug: '',
    price: 0,
    category: ''
});

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


get_data();

const handleImageUpload = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];


    if (!file) {
        console.error('Файл не выбран');
        return;
    }

    console.log(file);

    try {
        const formData = new FormData();
        formData.append('file', file);

        console.log(formData);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        // Отправляем POST-запрос для загрузки файла на сервер
        API.post('images/', formData, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error('Ошибка загрузки файла:', error);
    }
};


function get_data() {
    Promise.all([
        API.get('categories/'),
        API.get('products/')
    ])
        .then(function ([categoriesResponse, productsResponse]: any) {
            categories.value = categoriesResponse.data;
            console.log(categories);
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


function openModal(product: Product_modal) {
    selectedProduct.value = { ...product };
}

function closeModal() {
    selectedProduct.value = null;
}

const saveNewProduct = () => {
    addProduct(newProduct.value);
};

const addProduct = async (newProduct: new_product) => {
    console.log(newProduct);
    await API.post('products/', newProduct).then(
        (response) => {
            console.log('Product added:', response.data);
            toast.add({
                title: "Товар успешно добавлен.",
                timeout: 1000,
                callback: () => {
                    get_data();
                },
            });
            closeAddProductModal();
        }
    ).catch((error) => {
        toast.add({
            title: "Произошла ошибка. Товар не был добавлен.",
            timeout: 1000,
            callback: () => {
                get_data();
            },
            color: "flamingo",
            ui: { background: "bg-white dark:bg-neutral-900" },
        });
        console.error('Error adding product:', error);
    });
};

const deleteproduct = () => {
    if (selectedProduct.value) {
        API.delete(`products/${selectedProduct.value.id}/`)
            .then((response) => {
                console.log('Product deleted:', response.data);
                toast.add({
                    title: "Продукт был удалён.",
                    timeout: 1000,
                    callback: () => {
                        get_data();
                    },
                });
                closeModal();
            })
            .catch((error) => {
                toast.add({
                    title: "Произошла ошибка. Продукт не был не удалён.",
                    timeout: 1000,
                    callback: () => {
                        get_data();
                    },
                    color: "flamingo",
                    ui: { background: "bg-white dark:bg-neutral-900" },
                });
                console.error('Error deleting product:', error);
            });
    }
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

function openAddProductModal() {
    addProductModalOpen.value = true;
}

function closeAddProductModal() {
    addProductModalOpen.value = false;
}

const { logout } = actions();
</script>