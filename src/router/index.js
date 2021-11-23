import Vue from 'vue'
import VueRouter from 'vue-router'

import guestModule from '../modules/guest/router'
import adminModule from '../modules/admin/router'
import clientModule from '../modules/client/router'

Vue.use( VueRouter )

const routes = [
    {
        path: '/',
        ...guestModule
    },
    {
        path: '/admin',
        ...adminModule
    },
    {
        path: '/client',
        ...clientModule
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior: function (to, from, savedPosition) {
        if (to.hash) {
            return { selector: to.hash }
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router