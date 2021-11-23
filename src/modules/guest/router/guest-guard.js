import api from '@/api/api'

const guestGuard = async (to,from, next) => {

    let response

    try{
        response = await api.get('/role-abilities')
        
    }catch(error){
        response = error.response
    }

    if( response.status === 401 ){
        next()
        return
    }

    next( from.name )
}

export default guestGuard