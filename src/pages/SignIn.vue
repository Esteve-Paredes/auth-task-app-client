<script setup lang="ts">
import { reactive, ref } from "vue";
import { loginUser } from "../api/loginUser";
import router from "../router/router";
import Button from "../components/Button.vue";

const dataUser = reactive({
  email: "",
  password: "",
});

const showError = ref(false);
const loading = ref(false);

const submitForm = async () => {
  try {
    loading.value = true;
    const data = await loginUser(dataUser);

    if (!data) {
      throw new Error("Credenciales invalidas");
    }

    localStorage.setItem("token", data.token);
    router.push("/");

    dataUser.email = "";
    dataUser.password = "";
  } catch (error) {
    dataUser.email = "";
    dataUser.password = "";

    showError.value = true;
    console.error("Error: ", error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="flex flex-col text-gray-700">
      <h4 class="font-sans text-2xl font-semibold text-blue-gray-900">
        Sign In
      </h4>
      <p class="mt-2 font-sans text-base font-normal text-gray-700">
        Enter your details.
      </p>
      <form
        class="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col gap-9"
        @submit.prevent="submitForm"
      >
        <div class="flex flex-col gap-6">
          <div class="">
            <label class="text-sm font-medium text-gray-900 mb-2" for="email"
              >Your email</label
            >
            <input
              type="text"
              id="email"
              v-model="dataUser.email"
              class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-3"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div class="">
            <label
              for="password"
              class="text-sm font-medium text-gray-900 block mb-2"
              >Your password</label
            >
            <input
              type="password"
              id="password"
              v-model="dataUser.password"
              class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-3"
              placeholder="password"
              required
            />
          </div>
        </div>
        <Button class="w-full h-12" text="Login" :isLoading="loading"></Button>
        <span v-if="showError" class="text-red-600 text-sm text-center"
          >*Credenciales Invalidas</span
        >
        <p class="text-center font-sans text-base font-normal text-gray-700">
          Don't have an account yet?
          <a
            class="font-semibold text-bg-sky-700 transition-colors hover:text-emerald-600"
            href="#"
          >
            <RouterLink to="/signup">Sign Up</RouterLink>
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<style></style>
