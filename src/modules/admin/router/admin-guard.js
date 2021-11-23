import store from '../../../store'

const adminGuard = async (to, from, next) => {

    const adminPages = [
        'administrar-contenido',
        'pedidos'
    ]

    await store.dispatch('authModule/checkRole')

    const role = store.getters['authModule/userRole']

    if( role === 'admin' && adminPages.includes( to.name ) ){
        next()
        return
    }

    next( from.name )

}

export default adminGuard