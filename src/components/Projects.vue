<script setup lang="ts">
import { ProjectsEntity } from "../types/projectsEntity";

const props = defineProps<{
  project: ProjectsEntity;
}>();
</script>
<template>
  <RouterLink
    :to="{
      name: 'ProjectDetail',
      params: { projectId: props.project.id },
    }"
    class="border rounded-xl relative group bg-white cursor-pointer"
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
</template>

<style></style>
