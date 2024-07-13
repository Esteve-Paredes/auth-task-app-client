<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getProjects } from "../api/getProjects";
import { ProjectsEntity } from "../types/projectsEntity";
import Projects from "../components/Projects.vue";

const projects = ref<ProjectsEntity[]>([]);

onMounted(async () => {
  try {
    const response = await getProjects();

    projects.value = response.projects;

    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="py-16 overflow-hidden">
    <div class="container m-auto px-6 text-gray-500 md:px-12">
      <div>
        <span class="text-gray-600 text-lg font-semibold">Main</span>
        <h2 class="mt-4 text-2xl text-gray-900 font-bold md:text-4xl">
          Projects
        </h2>
      </div>
      <div
        class="mt-16 gap-4 grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <Projects
          v-for="project in projects"
          :key="project.id"
          :project="project"
        ></Projects>
        <RouterLink
          to="/projectDetail"
          class="border rounded-xl relative group bg-white cursor-pointer"
        >
          <div class="relative p-8">
            <h5 class="text-xl text-gray-800 font-medium">First feature</h5>
            <p class="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ad
              dolorem accusamus! Libero minus placeat molestias, quam corporis
              dolor ducimus?
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style></style>
