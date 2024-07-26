/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAVTO1V7xeIHb6tn4wgedxNzLRLAytBVZ4",
  authDomain: "notes-6dc4a.firebaseapp.com",
  projectId: "notes-6dc4a",
  storageBucket: "notes-6dc4a.appspot.com",
  messagingSenderId: "777800467056",
  appId: "1:777800467056:web:0ce7052bc2464e9ac86ab5",
};

const app = createApp(App);
initializeApp(firebaseConfig);
registerPlugins(app);

app.mount("#app");
