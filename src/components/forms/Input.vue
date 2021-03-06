<template>
  <div>
    <input
      class="appearance-none justify-center text-gray-600 w-full font-normal bg-white border border-gray-400 px-3 py-2 rounded shadow leading-tight focus:outline-none focus:border-green-300 transition duration-150"
      :placeholder="label"
      :disabled="disabled"
      :max="max || ''"
      :min="min || ''"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('update:modelValue', $event.target.value)"
      :readonly="readonly"
    >
    <div v-if="showErrorMsg" class="text-red-700 text-left font-light text-sm pt-1">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

type InputType = 'text'|'tel'|'email'|'number'|'password'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    label: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String as PropType<InputType>,
    },
    max: {
      required: false,
      type: [Number, String] as PropType<number>,
    },
    min: {
      required: false,
      type: [Number, String] as PropType<number>,
    },
    modelValue: {
      required: false,
      type: [String, Number] as PropType<string|number>,
    },
    disabled: {
      required: false,
      type: Boolean as PropType<boolean>,
    },
    readonly: {
      required: false,
      type: Boolean as PropType<boolean>,
    },
    error: {
      required: false,
      type: [String, Boolean] as PropType<string|boolean>,
    },
  },
  setup(props) {
    const showErrorMsg = computed(() => typeof props.error === 'string')
    const modify = (value: typeof props.type) => props.type === 'number' ? Number(value) : value

    return { showErrorMsg, modify }
  }
})
</script>
