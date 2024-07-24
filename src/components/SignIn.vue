<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      class="mx-auto pa-6 d-flex flex-column align-center justify-center"
      max-width="344"
      title="Вход"
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
        ></v-text-field>

        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions class="d-flex flex-column">
        <v-btn color="primary" class="mb-2" @click="register">
          Зарегестрироваться
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <RouterLink to="/">
          <v-btn color="primary">
            Еще не зарегистрирован?
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </RouterLink>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
    terms: false,
  }),
  methods: {
    register() {
      // Добавьте логику регистрации здесь
    },
  },
};
</script>

<style>
.fill-height {
  height: 100vh;
}
</style>
