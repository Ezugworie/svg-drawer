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
      <div class="sm:w-full md:w-1/4" v-if="state.matches('CIRCLE')">
        <circle-form/>
      </div>
      <div class="sm:w-full md:w-1/4" v-if="state.matches('SQUARE')">
        <square-form/>
      </div>
      <div class="sm:w-full md:w-1/4" v-if="state.matches('RECTANGLE')">
        <rectangle-form/>
      </div>
      <div class="sm:w-full md:w-1/4" v-if="state.matches('TRIANGLE')">
        <triangle-form/>
      </div>
    </div>
    <div class="sm:w-full md:w-full space-x-4 flex justify-center">
      <button
        class="rounded border-green-300 text-gray-600 inline-flex items-center border py-1 pr-16 focus:outline-none focus:shadow bg-green-200 transition duration-150"
        @click="drawShape()"
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
  <div class="w-full p-4 h-64">
    <div class="w-full border rounded p-2 h-64">

    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useShapes } from '../shapes';
import { useMachine } from '@vue/xstate'
import { Machine, assign, createMachine } from "xstate";
import { Circle, Square, Rectangle, Triangle } from './forms'
import { useShapeState } from '../xstate/index'


export default defineComponent({
  components: {
    CircleForm: Circle,
    SquareForm: Square, 
    TriangleForm: Triangle,
    RectangleForm: Rectangle, 
  },
  setup() {
    const selectedShape = ref('');
    const { defineShapes } = useShapes();
    const shapes = reactive(defineShapes);

    const drawShape = (() => {
      
    })

    const stateMachine = Machine({
      initial: 'idle',
      states: {
        idle: {
          on: {
            SUBMIT: 'loading',
          }
        },
        drawing: {
          on: {
            DRAWING_SUCCESS : 'success',
            DRAWING_FAILED : 'error',
          }
        },
        saving: {
          on: {
            SAVING_SUCCESS: 'success',
            SAVING_FAILED: 'error',
          }
        },
        success: {
          type: 'final',
        }
        
      }

    })

const { send, state } = useMachine(stateMachine)

    return { 
      send, 
      state, 
      shapes, 
      selectedShape 
    };
  },
});
</script>
