<template>
    <div class="container">
        <div class="row d-flex align-items-center vh-100">

            <div class="col-md-6 h-75">
                <h2 class="text-primary mb-4">Puedes visitarnos en</h2>

                <div class="h-100">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.718021213961!2d-76.54338008494709!3d38.97610624990637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7f6cddeace2f7%3A0x61e3bad09d11a691!2sSandy%20Pony%20Donuts!5e0!3m2!1ses-419!2sus!4v1637209014218!5m2!1ses-419!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>

            <div class="col-md-5 offset-md-1 text-center">
                <h3 class="text-center">Realiza tus pedidos a través de</h3>

                <p class="text-justify px-lg-5">
                    Te ofrecemos dos formas para hacer tus pedidos, puedes contactarnos via telefónica al número
                </p>

                <p class="ml-3 text-primary text-left px-lg-5">
                    <i class="fas fa-phone text-dark mr-2"></i>
                    {{ phoneFormatted }}
                </p>

                <p class="text-justify px-lg-5">
                    O puedes crear tu cuenta en la página para realizar tus pedidos a través de nuestra aplicación web.
                </p>

                <button
                    class="btn btn-primary text-white"
                    @click="$router.push({ name: 'register' })"
                >
                    Crear cuenta
                </button>

            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('guestModule', ['phone_number']),
        phoneFormatted(){
            const phoneArray = this.phone_number.split('')
            return `${ phoneArray.slice(0, 3).join('') }-${ phoneArray.slice(3, 6).join('') }-${ phoneArray.slice(6).join('') }`
        },
    }
}
</script>

<style>
    
</style>