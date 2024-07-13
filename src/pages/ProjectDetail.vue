<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, reactive } from "vue";
import { getProjectsById } from "../api/getProjectById";
import Tasks from "../components/Tasks.vue";

const route = useRoute();
const projectId = computed(() => route.params.projectId);

const projectInitial = reactive({
  title: "",
  description: "",
});

onMounted(async () => {
  try {
    const id = projectId.value;
    const { project } = await getProjectsById(+id);

    projectInitial.title = project.title;
    projectInitial.description = project.description;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="py-16 overflow-hidden">
    <div class="container m-auto px-6 text-gray-500 md:px-12">
      <div class="relative p-8">
        <h5 class="text-xl text-gray-800 font-medium">
          {{ projectInitial.title }}
        </h5>
        <p class="text-sm text-gray-600">
          {{ projectInitial.description }}
        </p>
      </div>
      <Tasks></Tasks>
    </div>
  </div>
</template>

<style></style>
