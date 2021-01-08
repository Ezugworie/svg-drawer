<template>
  <div>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useShapes } from '../../shapes'

export default defineComponent ({
  props: {
    
  },
  setup() {

    return {
      useShapes
    }
  }
});

</script>
