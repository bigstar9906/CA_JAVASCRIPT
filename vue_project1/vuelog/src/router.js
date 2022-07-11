import { createWebHistory, createRouter } from "vue-router";
import DocList from './components/DocList.vue'
import HomeScreen from './components/HomeScreen.vue'
import DocDetail from './components/DocDetail.vue'
import DocDetails from './components/DocDetails.vue'

const routes = [
    {
        path:"/",
        component:HomeScreen,
    },
    {
        path: "/DocList",
        component: 
        DocList,
    },
    {
        path: "/DocDetail/:id",
        component:DocDetail,
    },
    {
        path: "/DocDetail",
        component:DocDetails,
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 