import store from '../../../store'

const clientGuard = async (to, from, next) => {

    const clientPages = [ 'client-profile', 'edit-profile' ]

    await store.dispatch('authModule/checkRole')
    
    const role = store.getters['authModule/userRole']

    if( role === 'client' && clientPages.includes( to.name ) ){
        next()
        return
    }

    next( from.name )

}

export default clientGuard