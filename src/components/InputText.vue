<script setup lang="ts">
import { InputProps } from "../types/InputProps";

const props = defineProps<InputProps>();

const emit = defineEmits(["updateModelValue"]);

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("updateModelValue", input.value);
};
</script>
<template>
  <input
    :type="props.type"
    :id="props.id"
    :value="props.modelValue"
    @input="updateValue"
    class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-3"
    :placeholder="props.placeholder"
    required
  />
</template>
