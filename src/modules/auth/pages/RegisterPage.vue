<template>
    <div class="container mt-5">
        <div class="row justify-content-center">

            <div class="card shadow border-0 col-11 col-md-5">

                <div class="card-body py-5 px-4">
                    <h2 class="text-center mb-4">
                        Crear cuenta
                    </h2>                

                    <div class="form-group mt-4">
                        <label
                            for="email"
                            class="text-primary"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            class="form-control"
                            placeholder="example@emperador.com"
                            v-model="email"
                        >
                    </div>

                    <div class="form-group mt-4">
                        <label
                            for="password"
                            class="text-primary"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Contraseña"
                            v-model="password"
                        >
                    </div>

                    <div v-if="error" class="d-block invalid-feedback text-center">
                        {{ errorMessage }}
                    </div>

                    <button
                        class="btn btn-primary btn-block mt-4 text-white"
                        @click="handleRegister"
                    >
                        <Loader v-if="isLoading" color="light" />

                        <span v-else>Crear cuenta</span>
                    </button>

                    <p class="mt-3 text-justify">
                        Al registrarte aceptas los terminos y condiciones de la aplicación, así como la política de privaciadad.
                    </p>

                    <p class="text-center">
                        ¿Ya tienes una cuenta?,
                        <router-link
                            :to="{ name: 'login' }"
                        >
                            inicia sesión
                        </router-link>
                        .
                    </p>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions('authModule', ['register']),
        async handleRegister(){

            if( !this.email.length && !this.password.length )
                return

            const user = { email: this.email, password: this.password }

            const hasBeenRegistered = await this.register( user )
            console.log('registered', hasBeenRegistered)
            if( hasBeenRegistered )
                this.$router.push({ name: 'login' })
        }
        
    },
    computed: {
        ...mapState('authModule', ['error', 'errorMessage']),
        ...mapState(['isLoading']),
    },
    components: {
        Loader: () => import('../../shared/components/Loader.vue')
    }
}
</script>

<style scoped>
    a{
        color: #00e0ff !important;
    } 
</style>