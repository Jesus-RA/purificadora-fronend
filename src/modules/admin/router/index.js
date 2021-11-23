import adminGuard from './admin-guard';

export default {
    name: 'admin',
    beforeEnter: adminGuard,
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
        {
            path: '/administrar-contenido',
            name: 'administrar-contenido',
            component: () => import('../pages/AdministrarContenidoPage.vue')
        },
        {
            path: '/pedidos',
            name: 'pedidos',
            component: () => import('../pages/OrdersPage.vue')
        }
    ]
}