import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/views/Home'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router
