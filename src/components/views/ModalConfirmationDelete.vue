<!-- eslint-disable no-undef -->
<script setup>

defineProps({
    show: Boolean,
    todoData: {},
})

</script>
<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-body">
                    <slot name="body">Are you sure to delete <b>{{ todoData.name }}</b> from todo list?</slot>
                </div>
                <div name="footer" class="flex justify-between">
                    <button
                        class="rounded-md w-1/2 bg-[#b8b8b8] text-[#272727] py-2 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-1"
                        @click="$emit('close')" type="submit">Cancel</button>

                    <button
                        class="rounded-md w-1/2 bg-[#b8b8b8] text-[#272727] py-2 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-1"
                        @click="$emit('delete')" type="submit">Delete</button>

                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-body {
    margin: 20px 0;
    text-align: center;
}

</style>