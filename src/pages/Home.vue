<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getProjects } from "../api/getProjects";
import { ProjectsEntity } from "../types/projectsEntity";
import Projects from "../components/Projects.vue";
import CreateModalProject from "../components/CreateModalProject.vue";
import EditModalProject from "../components/EditModalProject.vue";
import { useRouter } from "vue-router";

const projects = ref<ProjectsEntity[]>([]);

//data para actualizar el proyecto
const dataProject = ref<ProjectsEntity | null>(null);

const viewModals = reactive({
  editModal: false,
  createModal: false,
});

//cerrar modales
const closeModal = () => {
  viewModals.editModal = false;
  viewModals.createModal = false;
};

//mostrar el CreateModalProject
const viewModalCreate = () => {
  viewModals.createModal = true;
};

//se obtiene el proyecto y se agrega a projects para su renderizado en ui
const getProject = (data: ProjectsEntity) => {
  projects.value.push(data);
};

//mostrar el UpdateModal y enviar datos del producto al Modal
const viewModalAndGetData = (data: ProjectsEntity) => {
  viewModals.editModal = true;
  dataProject.value = data;
};

//actualizar el producto con la respuesta del fetch para que se muesre en la UI
const updateProject = (data: ProjectsEntity) => {
  const indexProduct = projects.value.findIndex((pro) => pro.id === data.id);
  if (indexProduct !== -1) {
    projects.value[indexProduct] = data;
  }
};

const deleteProje = (data: ProjectsEntity) => {
  projects.value = projects.value.filter((prod) => prod.id !== data.id);
};

const router = useRouter();

const logOut = () => {
  localStorage.removeItem("token");
  router.push({ name: "SignIn" });
};

onMounted(async () => {
  try {
    const response = await getProjects();

    projects.value = response.projects;
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="py-16 overflow-hidden">
    <div class="container m-auto px-6 text-gray-500 md:px-12">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-gray-600 text-lg font-semibold">Main</span>
          <h2 class="mt-4 text-2xl text-gray-900 font-bold md:text-4xl">
            Projects
          </h2>
        </div>
        <div class="text-white">
          <button
            @click="viewModalCreate"
            class="bg-black rounded-lg px-4 py-2 hover:opacity-80"
          >
            Add Project
          </button>
          <button
            @click="logOut"
            class="bg-black rounded-lg px-4 py-2 hover:opacity-80 ml-3"
          >
            Log Out
          </button>
        </div>
      </div>
      <div
        class="mt-16 gap-6 grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <Projects
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @openModal="viewModalAndGetData"
          @deleteProject="deleteProje"
        ></Projects>
      </div>
    </div>
  </div>
  <CreateModalProject
    v-if="viewModals.createModal"
    @clickOutSideAndClose="closeModal"
    @newProject="getProject"
  ></CreateModalProject>
  <EditModalProject
    v-if="viewModals.editModal && dataProject"
    :project="dataProject"
    @clickOutSideAndClose="closeModal"
    @dataProjectUpdate="updateProject"
  ></EditModalProject>
</template>

<style></style>
