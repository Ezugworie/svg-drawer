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
      class="w-full md:flex md:flex-row items-center text-white p-4 md:justify-center md:space-x-4 mt-1"
    >
      <div class="w-full md:w-1/4 mb-3">
        <label
          for="size"
          class="block text-sm font-thin leading-5 mb-2 text-gray-700"
          >
          Shape
        </label>

        <select
          v-model="inputs.selectedShape"
          class="
            block appearance-none text-gray-600 w-full font-normal bg-white border
          border-gray-400 px-3 py-2 pr-8 rounded shadow leading-tight focus:outline-none 
          focus:border-green-300 transition duration-150"
        >
          <option disabled selected value="">Pick a shape</option>
          <option v-for="shape in shapes" :value="shape.name" :key="shape.id">{{ shape.name }}</option>
        </select>
        <span class="text-red-500 text-xs mb-2" v-if="error.selectedShape">Select a shape</span>
      </div>
      <div class="sm:w-full md:w-1/4 mb-3" v-show="showSelectedForm() === 'Circle'">
        <label
          for="size"
          class="block text-sm font-thin leading-5 mb-2 text-gray-700"
          >
          {{shapes[0].dimension}}
        </label>
        <text-input
          label="Radius"
          type="number"
          min="1"
          v-model="inputs.length"
        />
        <span class="text-red-500 text-xs capitalize" v-if="error.length">enter circle radius</span>
      </div>
      <div class="sm:w-full md:w-1/4 mb-3" v-show="showSelectedForm() === 'Square'">
        <label
          for="size"
          class="block text-sm font-thin leading-5 mb-2 text-gray-700"
          >
          {{shapes[1].dimension}}
        </label>
        <text-input
          label="Length"
          type="number"
          v-model="inputs.length"
        />
        <span class="text-red-500 text-xs capitalize" v-if="error.length">enter square length</span>
      </div>
      <div class="sm:w-full md:space-x-4 flex md:flex-row flex-col mb-3 md:w-1/4" v-show="showSelectedForm() === 'Rectangle'">
        <div class="flex flex-col">
          <label
            for="size"
            class="block text-sm font-thin leading-5 mb-2 text-gray-700"
          >
            {{shapes[2].dimension[0]}}
          </label>
            <text-input
              label="Length"
              type="number"
              v-model="inputs.length"
            />
            <span class="text-red-500 text-xs capitalize" v-if="error.length">enter rectangle length</span>
          </div>
          <div class="flex flex-col">
            <label
              for="size"
              class="block text-sm font-thin leading-5 mb-2 text-gray-700"
            >
              {{shapes[2].dimension[1]}}
            </label>
            <text-input
              label="Height"
              type="number"
              v-model="inputs.height"
            />
            <span class="text-red-500 text-xs capitalize" v-if="error.height">enter rectangle height</span>
          </div>
      </div>

      <!-- not fully implemented -->
      <div class="sm:w-full md:w-1/2" v-show="showSelectedForm() === 'Triangle'" v-if="false">
        <div>
          <label
              for="size"
              class="block text-sm font-thin leading-5 mb-2 text-gray-700"
            >
              {{shapes[2].dimension}}
          </label>
          <text-input
            label="Length"
            type="number"
            v-model="inputs.length"
          />
        </div>
      </div>
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
      </button>
    </div>
  </div>
  <div 
    class="w-full flex flex-wrap p-4 m-2 border rounded"
    v-if="showCanvas">
    <div
      class="flex items-center p-2"
      v-for="drawnShape in drawnShapes" 
      :key='drawnShape.id'>
        <span v-html="drawnShape.value" class="-z-10"></span>
    </div>
  </div>
</template>


<script lang="ts">
import { useShapes } from '../shapes'
import { Select, Input} from './forms'
import { store } from '../store/index'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, defineComponent, reactive, ref, watchEffect, onMounted, toRefs } from 'vue';
// import Vivus from 'vivus'


export default defineComponent({
  components: {
    SelectInput: Select,
    TextInput: Input,
  },
  setup() {
    const { defineShapes, loading, drawShape, drawnShapes } = useShapes();
    const shapes = reactive(defineShapes);
    const showShape = ref(false)
    const showCanvas = ref(false)
    const shapesHistory = ref([null])
    const errors = ref<Record<string, string[]>>()
    const error = reactive({
      selectedShape: null,
      length: null,
      height: null,
    })
    const inputs = reactive({
      selectedShape: null,
      length: null,
      height: null,
    })

    const rules = {
      length: {
        required,
      },
      height: {
        required,
      },
    }
    
    const startDrawingShape = async () => {
      if (!inputs.selectedShape) {
        console.log("INVALID FORM")
        error.selectedShape = true
        return
      } 
      if (!inputs.length) {
        error.length = true
        return
      } 
      if (inputs.selectedShape === 'Rectangle' && !inputs.height) {
        error.height = true
        return
      }
      showCanvas.value = true
      drawShape(inputs.selectedShape, inputs.length, inputs.height)
        .then(() => store.dispatch('saveDrawnShapes', drawnShapes ))
    }
    
    const showSelectedForm = (() => {
      return inputs.selectedShape
    })
    
    watchEffect(() => {
        console.log("Shape is now " + inputs.selectedShape)
        error.selectedShape = inputs.selectedShape? null : false
        error.length = inputs.length? null : false
        error.height = inputs.height? null : false
    })
  
    onMounted(() => {
    //  aminateSVG = new Vivus(canvas, { duration: 60 })
    })
    return { 
      error,
      inputs, 
      shapes, 
      showCanvas,
      drawnShapes,
      shapesHistory,
      showSelectedForm,
      startDrawingShape,
    };
  },
});
</script>
