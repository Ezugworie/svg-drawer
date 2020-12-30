<template>
  <div>
    <h4
    for="size"
    class="block font-thin leading-5 mb-2 text-gray-700"
    >Length
    </h4>
    <input
      id="size"
      class="form-input block w-full py-2 px-3 font-medium text-gray-600 border border-gray-400 shadow rounded shadow-sm focus:outline-none focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      type="number"
      min="1"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent ({
  setup() {

    return {}
  }
});

</script>
