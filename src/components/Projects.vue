<script setup lang="ts">
import { ProjectsEntity } from "../types/projectsEntity";
import EditSVG from "./EditSVG.vue";
import DeleteSvg from "./DeleteSVG.vue";

const props = defineProps<{
  project: ProjectsEntity;
}>();
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
      <button class="border p-2 rounded-lg">
        <EditSVG></EditSVG>
      </button>
      <button class="border p-2 rounded-lg">
        <DeleteSvg></DeleteSvg>
      </button>
    </div>
  </div>
</template>

<style></style>
