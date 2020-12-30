import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Graphql from './components/Graphql.vue'

export const routerHistory = createWebHistory()
export const router = createRouter({
    history: routerHistory,
    strict: true,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
          path: '/graphql',
          name: 'playground',
          component: Graphql,
        },
    ],
})
