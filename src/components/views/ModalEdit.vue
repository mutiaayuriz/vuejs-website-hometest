<!-- eslint-disable no-undef -->
<script setup>
import { reactive, computed } from 'vue';

const state = reactive({ data: null });
const props = defineProps({
  show: Boolean,
  todoData: {},
})

const inputData = computed({
  get() { return props.todoData; },
  set(newValue) { state.todoData.name = newValue },
});

</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <form id="form">
          <div class="flex h-auto bg-white text-slate-400 border border-slate-30 justify-between my-2">
            <div class="w-2/3 justify-start">
              <input
                class="w-full h-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm px-3 py-3 transition duration-300 ease focus:shadow"
                v-model="inputData.name" type="text" />
            </div>
            <div class="justify-end">
              <div class="m-4 flex">
                <div @click="$emit('edit', todoData)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="24"
                    height="24">
                    <path fillRule="evenodd"
                      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd" />
                  </svg>
                </div>

                <div @click="$emit('close')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="24"
                    height="24">
                    <path
                      d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </form>
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
</style>