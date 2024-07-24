<template>
    <v-container class="fill-height d-flex align-center justify-center">
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
  
          <v-btn color="primary">
            Complete Registration
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
          <RouterLink to="/LogIn" >
          <v-btn color="primary">
            Уже зарегистрирован?
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
    }
  </script>
  
  <style>
    .fill-height {
      height: 100vh;
    }
  </style>
  