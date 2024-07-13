<script>
import { onMounted } from "vue";

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
</template>

<style></style>
