<template>
  <div class="w-full bg-green-400 text-white p-4 font-bold shadow-lg">
    <div
      class="bg-white w-1/6 rounded-md text-green-400 text-xl flex flex-row p-2"
    >
      <div class="w-1/2 flex">Shape Drawer</div>
      <img src="icons/pen.svg" class="transform -rotate-135 w-1/2 mt-1 h-12" />
    </div>
  </div>
  <div class="w-full text-gray-500 p-4 font-medium flex justify-center mt-3">
    Hi there!!, I am a shape drawer, select any shape you want, enter the size
    and wala!!!
  </div>
  <div class="w-full">
    <div
      class="w-full text-white p-4 flex sm:flex-col md:flex-row justify-center space-x-4 mt-1"
    >
      <div class="inline-block relative sm:w-full md:w-1/4">
        <label
          for="size"
          class="block text-sm font-thin leading-5 mb-2 text-gray-700"
          >Shape</label
        >
        <select
          v-model="selectShape"
          class="block appearance-none text-gray-600 w-full font-normal bg-white border border-gray-400 px-3 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-green-300 transition duration-150"
        >
          <option disabled selected value="">Pick a shape</option>
          <option v-for="shape in shapes" :value="shape.name" :key="shape.id">{{
            shape.name
          }}</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
      <div class="sm:w-full md:w-1/4">
        <h4
          for="size"
          class="block font-thin leading-5 mb-2 text-gray-700"
          >Length</h4
        >
        <input
          id="size"
          class="form-input block w-full py-2 px-3 font-medium text-gray-600 border border-gray-400 shadow rounded shadow-sm focus:outline-none focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type="number"
        />
      </div>
    </div>
    <div class="sm:w-full md:w-full space-x-4 flex justify-center">
      <button
        class="rounded border-green-300 text-gray-600 inline-flex items-center border py-2 pr-16 focus:outline-none focus:bg-green-200 hover:bg-green-100 transition duration-150"
      >
        <img
          src="/icons/pen.svg"
          alt=""
          srcset=""
          class="transform -rotate-135"
        />
        <span>Draw</span>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useShapes } from '../shapes';

export default defineComponent({
  name: 'Home',
  setup() {
    const selectShape = ref('');
    const { defineShapes } = useShapes();
    const shapes = reactive(defineShapes);

    return { shapes, selectShape };
  },
});
</script>
