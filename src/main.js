import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DB from "@/assets/storage";

Vue.config.productionTip = false;

export const LOCAL_STORAGE_DB = "db-1616195589069";
export const SESSION_KEY = "db-user";

let database;
if (localStorage.getItem(LOCAL_STORAGE_DB)) {
  database = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DB));
} else {
  localStorage.clear();
  database = localStorage.setItem(LOCAL_STORAGE_DB, JSON.stringify(DB));

  setTimeout(() => {
    router.go("/");
  }, 1000);
}

export const db = database;
export const dbName = LOCAL_STORAGE_DB;
export const dbUser = SESSION_KEY;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
