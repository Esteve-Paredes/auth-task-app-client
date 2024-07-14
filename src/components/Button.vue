<script setup lang="ts">
import SmallSpiner from "./SmallSpiner.vue";

const props = defineProps<{
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit";
  text: string;
}>();

const type = props.type || "submit";
const emit = defineEmits(["click"]);

const clickLoader = () => {
  emit("click");
};
</script>
<template>
  <button
    :type="type"
    class="text-white bg-black px-4 w-full h-9 rounded-md hover:opacity-80 disabled:pointer-events-none disabled:opacity-50"
    :disabled="props.isDisabled"
    @click="clickLoader"
  >
    <span v-if="!props.isLoading">{{ props.text }}</span>
    <div v-else class="w-full h-9 flex justify-center items-center">
      <SmallSpiner></SmallSpiner>
    </div>
  </button>
</template>
