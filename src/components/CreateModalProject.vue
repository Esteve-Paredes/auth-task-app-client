<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import SmallSpiner from "../components/SmallSpiner.vue";
import { createProject } from "../api/createProject";

const dataProject = reactive({
  title: "",
  description: "",
});

const loanding = ref(true);

const emit = defineEmits(["clickOutSideAndClose", "newProject"]);

//desabilita el boton si no hay ningun campo lleno
const isDisable = computed(() => {
  return !dataProject.title || !dataProject.description;
});

const clickLoader = () => {
  loanding.value = false;
};

//crear projecto y emite señales
const submitCreateProject = async () => {
  try {
    const { data } = await createProject(dataProject);

    if (!data) {
      throw new Error("Error al crear un projecto");
    }
    console.log(data.project);
    emit("newProject", data.project);
    emit("clickOutSideAndClose");
    loanding.value = true;
  } catch (error) {
    console.error("Error: ", error);
  }
};

//cierra el modal haciendo click fuera de el
const clickOutSideModal = () => {
  emit("clickOutSideAndClose");
};
</script>

<template>
  <div
    class="fixed top-0 w-full h-screen flex justify-center items-center z-30"
  >
    <div
      @click="clickOutSideModal"
      class="absolute top-0 w-full h-full bg-slate-600 opacity-50"
    ></div>
    <form
      @submit.prevent="submitCreateProject"
      class="p-3 relative w-[380px] h-[400px] shadow-xl flex flex-col justify-center items-center gap-5 bg-white text-black rounded-2xl"
    >
      <h2 class="text-gray-800 text-xl font-bold pt-2">Add Project</h2>
      <div class="w-full px-6 flex flex-col gap-1">
        <label for="name" class="text-gray-800 text-lg font-bold">Title</label>
        <input
          type="text"
          v-model="dataProject.title"
          class="rounded-md py-1 px-3 border mb-5 mt-2 text-gray-600 w-full h-10 flex items-center pl-3 text-sm border-gray-300"
          placeholder="Name Project"
        />
      </div>
      <div class="w-full px-6 flex flex-col gap-1">
        <label for="description" class="text-gray-800 text-lg font-bold"
          >Description</label
        >
        <textarea
          v-model="dataProject.description"
          class="rounded-md py-1 px-3 border mb-5 mt-2 text-gray-600 w-full h-16 flex items-center pl-3 text-sm border-gray-300 resize-none"
          placeholder="Description Project"
        ></textarea>
      </div>
      <button
        class="text-white bg-black w-24 h-9 rounded-xl hover:opacicty-80 disabled:pointer-events-none disabled:opacity-50"
        :disabled="isDisable"
        @click="clickLoader"
      >
        <span v-if="loanding">Crear</span>
        <div v-else class="w-24 h-9 flex justify-center items-center">
          <SmallSpiner></SmallSpiner>
        </div>
      </button>
    </form>
  </div>
</template>

<style></style>
