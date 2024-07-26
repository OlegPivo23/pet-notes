<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center"
  >
    <!-- Алерт -->
    <v-alert
      v-if="authStore.error"
      type="error"
      class="alert mb-4"
      dismissible
      icon="mdi-alert-circle"
    >
      {{ authStore.error }}
    </v-alert>

    <!-- Форма регистрации -->
    <v-card
      class="mx-auto pa-6 d-flex flex-column align-center justify-center"
      max-width="344"
      title="Регистрация"
    >
      <v-container>
        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          type="password"
        ></v-text-field>

        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions class="flex flex-column">
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="signUp">
          Зарегестрироваться
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <RouterLink to="/LogIn">
          <v-btn color="primary">
            Уже зарегистрирован?
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </RouterLink>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref<string>("");
const password = ref<string>("");
const terms = ref<boolean>(false);

const signUp = async () => {
  await authStore.auth({email: email.value, password: password.value}, 'signup')
  router.push('/main')
}
</script>

<style>
.fill-height {
  height: 100vh;
}

.alert {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
}

.alert .v-alert__icon {
  margin-right: 8px;
}

.alert .v-alert__action {
  color: #721c24;
}
</style>
