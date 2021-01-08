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
          >
          Shape
        </label>

        <select
          v-model="selectedShape"
          class="block appearance-none text-gray-600 w-full font-normal bg-white border border-gray-400 px-3 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-green-300 transition duration-150"
        >
          <option disabled selected value="">Pick a shape</option>
          <option v-for="shape in shapes" :value="shape.name" :key="shape.id">{{ shape.name }}</option>
        </select>
      </div>
      <div class="sm:w-full md:w-1/4" v-show="showSelectedForm() === 'Circle'">
        <label
          for="size"
          class="block text-sm font-thin leading-5 mb-2 text-gray-700"
          >
          Length
        </label>
        <text-input
          label="Radius"
          type="number"
          min="1"
          v-model="inputs.circle.radius"
        />
      </div>
      <!-- <div class="sm:w-full md:w-1/4" v-show="showSelectedForm() === 'Square'">
        <text-input
          label="Square"
          type="number"
          v-model="inputs"
          :disabled="loading"
        />
      </div> -->
      <!-- <div class="sm:w-full space-x-4 flex md:w-1/4" v-show="showSelectedForm() === 'Rectangle'">
        <text-input
          label="Length"
          type="number"
          v-model="inputs"
          :disabled="loading"
        />
        <text-input
          label="Height"
          type="number"
          v-model="inputs"
          :disabled="loading"
        />
      </div> -->
      <!-- <div class="sm:w-full md:w-1/4" v-show="showSelectedForm() === 'Triangle'">
        <text-input
          label="Length"
          type="number"
          v-model="inputs"
          :disabled="loading"
        />
      </div> -->
    </div>
    <div class="sm:w-full md:w-full space-x-4 flex justify-center">
      <button
        class="rounded border-green-300 text-gray-600 inline-flex items-center border py-1 pr-16 focus:outline-none focus:shadow bg-green-200 transition duration-150"
        @click="startDrawingShape()"
      >
          <img
            src="/icons/pen.svg"
            alt="pen"
            class="transform -rotate-135"
          />
          <span>Draw</span>

          <!-- <div v-if="!loading" class="h-5 animate-spin inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ff0000" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4" />
              <path class="opacity-75" fill="#ff0000" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div> -->
      </button>
    </div>
  </div>
  <div class="w-full flex flex-wrap p-4 m-2 border rounded">
    <div class="flex items-center p-2" id="artboard"
     v-for="drawnShape in drawnShapes" :key='drawnShape.id'>
    <span v-html="drawnShape.value" class="-z-10"></span>
    </div>
    <!-- <svg height="200" width="200"> <circle cx="100" cy="100" r="90" stroke="green" stroke-width="2" fill="none" /> </svg> -->
  </div>
</template>

<script lang="ts">
import { useShapes } from '../shapes';
import { Select } from './forms'
import { Input } from './forms/index'
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue';


export default defineComponent({
  components: {
    SelectInput: Select,
    TextInput: Input,
  },
  setup() {
    const selectedShape = ref(null);
    const { defineShapes, loading, drawShape, drawnShapes } = useShapes();
    const shapes = reactive(defineShapes);
    const showShape = ref(false)
    const inputs = reactive({
      circle: {
        radius: null
      },
    })
    const startDrawingShape = (() => {
      drawShape(selectedShape, inputs.circle.radius, 'artboard')
      showShape.value = !showShape.value
    })

    const showSelectedForm = (() => {
      return selectedShape.value
    })
    
    watchEffect(() => {
        console.log("Shape is now " + selectedShape.value)
    })
  
    return { 
      inputs, 
      shapes, 
      drawnShapes,
      selectedShape,
      showSelectedForm,
      startDrawingShape,
    };
  },
});
</script>
