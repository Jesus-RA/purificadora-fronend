import api from '@/api/api'

export const loadOrders = async ({ commit }) => {

    try{
        commit('setLoading', true, { root: true })
        const { data } = await api.get('orders')

        const orders = data.map( ({ id, ownerRole, quantity, total }) => ({ id, ownerRole, quantity, total }) )

        commit('setOrders', orders)

    }catch(error){
        console.table(error)
    }finally{
        commit('setLoading', false, { root: true })
    }

}

export const makeOrder = async ({ dispatch }, order) => {

    let orderHasBeenCreated

    try{

        await api.post('/orders', order)
        orderHasBeenCreated = true

        await dispatch('loadOrders')

    }catch(error){
        console.table(error)
        orderHasBeenCreated = false
    }

    return orderHasBeenCreated

}

export const fetchProductPrice = async ({ commit }) => {
    
    let productPrice = 0.0

    try{
        const { data } = await api.get('/product_price')
        productPrice = data.product_price
    }catch(error){
        console.table(error)
    }finally{
        commit('setProductPrice', productPrice)
    }

}

export const loadCompanyData = async ({ commit } ) => {

    try{
        commit('setLoading', true, { root: true })
        const { data } = await api.get('/company-data')

        commit('setCompanyData', data)
        
    }catch(error){
        console.table(error)
    }finally{
        commit('setLoading', false, { root: true })
    }

}

export const storeCompanyData = async ({ commit }, companyData) => {

    let hasBeenDataSaved

    try{

        const { data } = await api.post('/company-data', companyData)

        hasBeenDataSaved = true
        commit('setCompanyData', data)

    }catch(error){
        console.table(error)
        hasBeenDataSaved = false
    }

    return hasBeenDataSaved

}