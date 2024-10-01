<!-- eslint-disable vue/require-v-for-key -->
<template>
    <main>
        <div class="bg-slate-400 text-white text-center h-auto">
            <p>Vuejs for List, Create, Edit, Delete</p>
        </div>
        <div class="w-full p-4 bg-[#ebebeb] h-screen">
            <!-- for create -->
            <div class="w-full justify-items-center">
                <div class="flex">
                    <span>Todo</span>
                </div>
                <div>
                    <form id="form" class="form-inline flex w-1/2" v-on:submit.prevent="addProduct">
                        <input
                            class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Insert Todo" v-model="todoValue.name" type="text" />
                        <button
                            class="rounded-md w-1/4 bg-[#b8b8b8] text-[#272727] py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="submit" value="Add Todo">
                            Add
                        </button>
                    </form>

                </div>
            </div>

            <!-- for searching -->
            <div class="w-full justify-items-center py-8">
                <div class="flex">
                    <span>List Todo </span>
                </div>
                <div class="flex w-1/2">
                    <input
                        class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Search Todo" v-model="keyword" type="text" />
                    <button
                        class="rounded-md w-1/4 bg-[#b8b8b8] py-2 px-4 border border-transparent text-center text-sm text-[#272727] transition-allfocus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        type="button" @click="searchProduct()">
                        Search
                    </button>
                </div>
            </div>

            <!-- for list data include edit and delete -->
            <div class="h-[50vh] overflow-auto">
                <div v-for="item in product" class="justify-items-center">
                    <div class="flex h-auto bg-white text-slate-400 border border-slate-30 w-1/2 justify-between my-2">
                        <div class="w-2/3 justify-start">
                            <div class="m-4 text-wrap md:text-balance truncate">
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="justify-end">
                            <div class="m-4 flex">
                                <div @click="clickEdit(item)" class="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        width="24" height="24">
                                        <path fillRule="evenodd"
                                            d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div @click="clickDelete(item)" class="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        width="24" height="24">
                                        <path
                                            d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </main>

    <Teleport to="body">
        <modalEdit :show="isModalEdit" :todoData="modalData" @close="isModalEdit = false && getProductData"
            @edit="updateProduct" />

        <modalDeleteConfirmation :show="isModalDeleteOpen" :todoData="modalData" @close="isModalDeleteOpen = false"
            @delete="() => deleteProduct(modalData.id)" />
    </Teleport>

</template>

<!-- eslint-disable no-unused-vars -->
<script>
import axios from "axios";
import modalEdit from './ModalEdit.vue';
import modalDeleteConfirmation from './ModalConfirmationDelete.vue';

export default {
    el: '#app',
    name: 'HomeTodoList',
    components: {
        modalEdit,
        modalDeleteConfirmation
    },
    data: () => {
        return {
            product: [],
            todoValue: {},
            keyword: '',
            productSearching: [],
            modalData: null,
            isModalEdit: false,
            isModalDeleteOpen: false
        }
    },
    mounted() {
        this.getProductData();
    },
    methods: {
        clickEdit: function (item) {
            this.isModalEdit = true;
            this.modalData = item;
        },
        clickDelete: function (item) {
            this.isModalDeleteOpen = true;
            this.modalData = item;
        },
        getProductData() {
            axios
                .get("http://localhost:3000/product/")
                .then((response) => {
                    this.product = response.data;
                    this.productSearching = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        searchProduct() {
            this.product = this.productSearching;
            const regex = new RegExp(this.keyword, 'i');
            this.product = this.product.filter(str => regex.test(str.name))
            return this.product;
        },
        addProduct() {
            axios
                .post("http://localhost:3000/product/", this.todoValue)
                .then((response) => {
                    this.getProductData();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateProduct(value) {
            this.isModalEdit = false;
            axios
                .put(
                    `http://localhost:3000/product/${value.id}`, value
                )
                .then((response) => {
                    this.getProductData();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteProduct(value) {
            this.isModalDeleteOpen = false;
            axios
                .delete(`http://localhost:3000/product/${value}`)
                .then(() => {
                    this.getProductData();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }
}
</script>
