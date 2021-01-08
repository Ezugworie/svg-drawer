import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'

export const routerHistory = createWebHistory()
export const router = createRouter({
    history: routerHistory,
    strict: true,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        }
    ],
})
