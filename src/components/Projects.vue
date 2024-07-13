<script setup lang="ts">
import { ProjectsEntity } from "../types/projectsEntity";
import EditSVG from "./EditSVG.vue";
import DeleteSvg from "./DeleteSVG.vue";

const props = defineProps<{
  project: ProjectsEntity;
}>();

const emit = defineEmits(["openModal", "deleteProduct"]);

const handlerEdit = () => {
  emit("openModal", props.project);
};
</script>
<template>
  <div class="flex flex-col gap-2">
    <RouterLink
      :to="{
        name: 'ProjectDetail',
        params: { projectId: props.project.id },
      }"
      class="border rounded-xl bg-white cursor-pointer w-full"
    >
      <div class="relative p-8">
        <h5 class="text-xl text-gray-800 font-medium">
          {{ props.project.title }}
        </h5>
        <p class="text-sm text-gray-600">
          {{ props.project.description }}
        </p>
      </div>
    </RouterLink>
    <div class="flex gap-1 px-3">
      <button class="border p-2 rounded-lg" @click="handlerEdit">
        <EditSVG class="fill-black stroke-black w-5"></EditSVG>
      </button>
      <button class="border p-2 rounded-lg">
        <DeleteSvg class="fill-black stroke-black w-5"></DeleteSvg>
      </button>
    </div>
  </div>
</template>

<style></style>
