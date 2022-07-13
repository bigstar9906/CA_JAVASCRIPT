import { createWebHistory, createRouter } from "vue-router";
import LearnProfile from './components/LearnProfile.vue'
import LearnContainer from './components/LearnContainer.vue'
import page404 from './components/Page404Error.vue'
const routes = [
  {
        path: "/",
        component: LearnContainer,
  },
  {
    path: "/profile/:id",
    component: LearnProfile,
  },
  {
    path: "/:anything(.*)",
    component: page404
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 