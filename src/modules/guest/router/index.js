import guestGuard from './guest-guard'

export default {
    beforeEnter: guestGuard,
    component: () => import('../layouts/GuestLayout.vue'),
    children: [
        {
            path: '',
            name: 'home',
            component: () => import('../pages/HomePage.vue')
        },
        {
            path: 'login',
            name: 'login',
            component: () => import('../../auth/pages/LoginPage.vue')
        },
        {
            path: 'register',
            name: 'register',
            component: () => import('../../auth/pages/RegisterPage.vue')
        },
    ]

}