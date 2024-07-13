<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { getProjectsById } from "../api/getProjectById";
import { useRoute } from "vue-router";

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
  <div class="relative p-8">tasks</div>
  <h2>
    {{ projectId }}
  </h2>
</template>

<style></style>
