<template>
    <div class="grow h-screen overflow-y-auto p-4">
        <div v-if="loading" class="flex justify-center items-center h-full animate__animated animate__fadeIn">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
        <div v-else class="">
            <div class="flex flex-wrap">
                <button v-if="categories.count > 0" v-for="category in categories.results" :key="category.id"
                    @click="selectedCategory = category.id"
                    class="text-center bg-transparent hover:bg-pale-sky-400 my-auto shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold p-1 border-2 border-pale-sky-900 dark:border-neutral-400 hover:dark:bg-neutral-800 rounded-lg animate__animated hovanimate__swing ml-3 mb-3"
                    :class="{ 'bg-neutral-300 dark:bg-pale-sky-600': category.id === selectedCategory }">
                    {{ category.title }}
                </button>
                <button @click="openAddCategoryModal"
                    class="text-center bg-mountain-500 hover:bg-mountain-700 text-white my-auto shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold p-1 dark:border-neutral-400 hover:dark:bg-mountain-700 rounded-lg animate__animated hovanimate__swing ml-3 mb-3 px-3 dark:active:bg-mountain-400 active:bg-mountain-300">
                    Добавить категорию
                </button>
                <button @click="openDeleteCategoryModal"
                    class="text-center bg-flamingo-500 hover:bg-flamingo-700 text-white my-auto shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold p-1 dark:border-neutral-400 hover:dark:bg-flamingo-700 rounded-lg animate__animated hovanimate__swing ml-3 mb-3 px-3 dark:active:bg-flamingo-400 active:bg-flamingo-300">
                    X
                </button>

            </div>
            <ul>
                <div class=" mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <div v-if="filteredProducts.length !== 0" v-for="product in filteredProducts" :key="product.id"
                        class="group relative">
                        <a href="" class="animate__animated animate__fadeIn" @click.prevent="openModal(product)">
                            <div
                                class="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 w-full">
                                <img :src="'data:image/png;base64,' + product.images" />
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
                    <div class="animate__animated animate__fadeIn" v-else>Нет данных</div>
                </div>
            </ul>
            <div class="fixed bottom-4 right-4">
                <button @click="openAddProductModal"
                    class=" text-white active:bg-pale-sky-900 hover:bg-pale-sky-800 bg-pale-sky-900 shadow-lg dark:shadow-neutral-700/50 text-black-700 font-semibold border-2 border-pale-sky-900 dark:border-neutral-100 hover:dark:bg-neutral-200 dark:bg-neutral-50 dark:text-black active:dark:bg-neutral-50 rounded-lg px-4 py-1 animate__animated animate__fadeIn">
                    Добавить товар
                </button>
            </div>
        </div>

        <div v-if="selectedProduct" class="fixed z-10 inset-0 overflow-y-auto">
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 animate__animated animate__fadeIn">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-center">
                            <div class="mt-3 sm:mt-0 sm:w-1/2 flex justify-center items-center">
                                <img :src="'data:image/png;base64,' + selectedProduct.images" class="w-full" />
                            </div>
                            <div class="mt-3 sm:mt-0 sm:ml-6 sm:w-1/2">
                                <div class="mb-4">
                                    <label for="title" class="block text-sm font-medium text-gray-700">Название</label>
                                    <input type="text" id="title" v-model="selectedProduct.title"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out">
                                </div>

                                <div class="mb-4">
                                    <label for="category"
                                        class="block text-sm font-medium text-gray-700">Категория</label>
                                    <select id="category" v-model="selectedProduct.category"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out">
                                        <option disabled value="">Select a category</option>
                                        <option v-for="category in categories.results" :key="category.id"
                                            :value="category.id">{{ category.title }}</option>
                                    </select>
                                </div>
                                <div class="mb-4">
                                    <label for="price" class="block text-sm font-medium text-gray-700">Цена</label>
                                    <input type="number" id="price" v-model.number="selectedProduct.price"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out">
                                </div>
                                <div class="mb-4">
                                    <label for="image"
                                        class="block text-sm font-medium text-gray-700">Изображение</label>
                                    <input type="file" id="image" @change="handleImageUpload"
                                        class="mt-1 block w-full transition-all duration-300 ease-in-out">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="saveModalChanges"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm ">
                            Save
                        </button>
                        <button type="button" @click="closeModal"
                            class="my-3 md:my-0 lg:my-0 xl:my-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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

        <div v-if="addProductModalOpen" class="fixed z-10 inset-0 overflow-y-auto animate__animated animate__fadeIn">
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
                                <img src="" class="w-full" alt="" />
                            </div>
                            <div class="mt-3 sm:mt-0 sm:ml-6 sm:w-1/2">
                                <div class="mb-4">
                                    <label for="title" class="block text-sm font-medium text-gray-700">Название</label>
                                    <input type="text" id="title" v-model="newProduct.title"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                        :class="{ 'border-red-500': !newProduct.title }">
                                    <div v-if="!newProduct.title" class="text-red-500 text-xs p-1">required</div>
                                </div>
                                <div class="mb-4">
                                    <label for="category"
                                        class="block text-sm font-medium text-gray-700">Категория</label>
                                    <select id="category" v-model="newProduct.category"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                        :class="{ 'border-red-500': !newProduct.category }">
                                        <option disabled value="">Select a category</option>
                                        <option v-for="category in categories.results" :key="category.id"
                                            :value="category.id">{{ category.title }}</option>
                                    </select>
                                    <div v-if="!newProduct.category" class="text-red-500 text-xs p-1">required</div>
                                </div>
                                <div class="mb-4">
                                    <label for="price" class="block text-sm font-medium text-gray-700">Цена</label>
                                    <input type="number" id="price" v-model="newProduct.price"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                        :class="{ 'border-red-500': !newProduct.price }">
                                    <div v-if="!newProduct.price" class="text-red-500 text-xs p-1">required</div>
                                </div>
                                <div class=" mb-4">
                                    <label for="image"
                                        class="block text-sm font-medium text-gray-700">Изображение</label>
                                    <input type="file" id="image" @change="handleImageUpload" class="mt-1 block w-full">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="saveNewProduct"
                            :disabled="!newProduct.title || !newProduct.category || !newProduct.price"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                            :class="{ 'opacity-50': !newProduct.title || !newProduct.category || !newProduct.price }">
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

        <div v-if="addCategoryModalOpen" class="fixed z-10 inset-0 overflow-y-auto animate__animated animate__fadeIn">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="">
                            <div class="mt-3">
                                <div class="mb-4">
                                    <label for="title" class="block text-sm font-medium text-gray-700">Название
                                        категории</label>
                                    <input type="text" id="title" v-model="newCategory.title"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                                        :class="{ 'border-red-500': !newCategory.title }">
                                    <div v-if="!newCategory.title" class="text-red-500 text-xs p-1">required</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="saveNewCategory" :disabled="!newCategory.title"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                            :class="{ 'opacity-50': !newCategory.title }">
                            Add
                        </button>
                        <button type="button" @click="closeAddCategoryModal"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="deleteCategoryModalOpen"
            class="fixed z-10 inset-0 overflow-y-auto animate__animated animate__fadeIn">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="">
                            <div class="mt-3">
                                <div class="mb-4">
                                    <label for="category"
                                        class="block text-sm font-medium text-gray-700">Категория</label>
                                    <select id="category" v-model="category_del_modal.id"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 ease-in-out">
                                        <option disabled value="">Select a category</option>
                                        <option v-for="category in categories.results" :key="category.id"
                                            :value="category.id">{{ category.title }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="deleteCategory"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-flamingo-600 text-base font-medium text-white hover:bg-flamingo-700 sm:ml-3 sm:w-auto sm:text-sm">
                            Delete
                        </button>
                        <button type="button" @click="closeDeteleCategoryModal"
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

const selectedCategory = ref(0);

const loading = ref(true);
const filteredProducts = ref<Product['results']>([]);
const addProductModalOpen = ref(false);
const addCategoryModalOpen = ref(false);
const deleteCategoryModalOpen = ref(false);
const selectedProduct = ref<Product_modal | null>(null);
const selectedFile = ref<file_modal | null>(null);

const toast = useToast();


interface Product_modal {
    id: number;
    title: string;
    price: number;
    category: number;
    images: string;
}

interface file_modal {
    file: File;
}

interface new_product {
    title: string;
    price: number;
    category: number;
}
interface new_category {
    title: string;
}

interface category_del_modal {
    id: number;
}

interface Product {
    count: number;
    results: {
        id: number;
        title: string;
        price: number;
        category: number;
        images: string;
    }[];
}

const newProduct = ref<new_product>({
    title: '',
    category: 0,
    price: 0,
});

const newCategory = ref<new_category>({
    title: '',
});

interface Category {
    count: number;
    results: {
        id: number;
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

const category_del_modal = ref<category_del_modal>({
    id: 0
})


get_data();

const handleImageUpload = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];


    if (!file) {
        console.error('Файл не выбран');
        return;
    }
    else {
        selectedFile.value = { file: file };
    }
};


function get_data() {

    // import axios from 'axios';

    // Определите базовый URL вашего API

    // Выполните GET-запрос к эндпоинту /products/
    // API.get('products/')
    //     .then(response => {
    //         // Обработка успешного ответа
    //         // console.log(response.data);
    //         products.value = response.data;
    //         console.log(products);
    //     })
    //     .catch(error => {
    //         // Обработка ошибки
    //         console.error('Ошибка при выполнении запроса:', error);
    //     });

    // API.get('categories/')
    //     .then(response => {
    //         // Обработка успешного ответа
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         // Обработка ошибки
    //         console.error('Ошибка при выполнении запроса:', error);
    //     });


    Promise.all([
        API.get('categories/'),
        API.get('products/')
    ])
        .then(function ([categoriesResponse, productsResponse]: any) {
            categories.value = categoriesResponse.data;
            products.value = productsResponse.data;

            if (categories.value.count > 0) {
                selectedCategory.value = categories.value.results[0].id;
                filterProducts();
            } else if (products.value.count > 0) {
                filteredProducts.value = products.value.results;
            }
            loading.value = false;

        })
        .catch(function (error: any) {
            console.log(error);
            loading.value = true;
        });
}


function filterProducts() {
    if (selectedCategory.value === 0) {
        filteredProducts.value = products.value.results;
    } else {
        filteredProducts.value = products.value.results.filter(product =>
            product.category === selectedCategory.value
        );
    }
}

watch(selectedCategory, (newValue) => {
    if (newValue === 0) {
        filteredProducts.value = products.value.results;
    } else {
        filteredProducts.value = products.value.results.filter(product =>
            product.category === newValue
        );
    }
});


function openModal(product: Product_modal) {
    selectedProduct.value = { ...product };
}

function closeModal() {
    selectedProduct.value = null;
    selectedFile.value = null;
}

const saveNewProduct = () => {

    if (!newProduct.value.title || !newProduct.value.category || !newProduct.value.price || !selectedFile.value?.file) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }

    addProduct(newProduct.value);
    selectedFile.value = null;
};

const saveNewCategory = () => {
    addCategory(newCategory.value);
};

const deleteCategory = () => {
    delCategory();
};

const delCategory = async () => {
    if (category_del_modal.value.id === 0) {
        toast.add({
            title: "Произошла ошибка. Выберите категорию.",
            timeout: 1000,
            callback: () => {
                get_data();
            },
            color: "flamingo",
            ui: { background: "bg-white dark:bg-neutral-900" },
        });
    }
    else if (category_del_modal.value) {
        // console.log(category_del_modal.value);
        API.delete(`categories/${category_del_modal.value.id}/`)
            .then((response) => {
                console.log('Category deleted:', response.data);
                toast.add({
                    title: "Категория будет удалена.",
                    timeout: 1000,
                    callback: () => {
                        get_data();
                    },
                });
                category_del_modal.value.id = 0;
                closeDeteleCategoryModal();
            })
            .catch((error) => {
                toast.add({
                    title: "Произошла ошибка. Категория не была удалена.",
                    timeout: 1000,
                    callback: () => {
                        get_data();
                    },
                    color: "flamingo",
                    ui: { background: "bg-white dark:bg-neutral-900" },
                });
                console.error('Error deleting category:', error);
            });
    }
}

const addProduct = async (newProduct: new_product) => {

    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('category', newProduct.category.toString());
    formData.append('price', newProduct.price.toString());
    if (selectedFile.value?.file) {
        formData.append('file', selectedFile.value.file);
    }

    await API.post('products/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(
        (response) => {
            toast.add({
                title: "Товар успешно добавлен.",
                timeout: 1000,
                callback: () => {
                },
            });
            get_data();
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
const addCategory = async (newCategory: new_category) => {
    await API.post('categories/', newCategory).then(
        (response) => {
            toast.add({
                title: "Категория успешно добавлена.",
                timeout: 1000,
                callback: () => {
                    get_data();
                },
            });
            closeAddCategoryModal();
        }
    ).catch((error) => {
        toast.add({
            title: "Произошла ошибка. Категория не была добавлена.",
            timeout: 1000,
            callback: () => {
                get_data();
            },
            color: "flamingo",
            ui: { background: "bg-white dark:bg-neutral-900" },
        });
        console.error('Error adding category:', error);
    });
};

const deleteproduct = () => {
    if (selectedProduct.value) {
        API.delete(`products/${selectedProduct.value.id}/`)
            .then((response) => {
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
        const formData = new FormData();
        formData.append('title', selectedProduct.value.title);
        formData.append('price', selectedProduct.value.price.toString());
        formData.append('category', selectedProduct.value.category.toString());

        if (selectedFile.value?.file) {
            formData.append('file', selectedFile.value.file);
        }

        API.put(`products/${selectedProduct.value.id}/`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
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

function openAddCategoryModal() {
    addCategoryModalOpen.value = true;
}

function closeAddCategoryModal() {
    addCategoryModalOpen.value = false;
    newCategory.value = {
        title: '',
    };

}

function openDeleteCategoryModal() {
    deleteCategoryModalOpen.value = true;
    selectedFile.value = null;
}

function closeDeteleCategoryModal() {
    deleteCategoryModalOpen.value = false;
    selectedFile.value = null;
}

function openAddProductModal() {
    addProductModalOpen.value = true;
    selectedFile.value = null;
}


function closeAddProductModal() {
    addProductModalOpen.value = false;
    newProduct.value = {
        title: '',
        price: 0,
        category: 0,
    };
    selectedFile.value = null;
}

const { logout } = actions();
</script>