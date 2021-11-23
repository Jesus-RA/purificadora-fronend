<template>
    <div class="container mt-5">
        <div class="row justify-content-center">

            <div class="card shadow border-0 col-11 col-md-5">

                <div class="card-body py-5 px-4">
                    <h2 class="text-center mb-4">
                        Bienvenido de vuelta
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
                            @keyup.enter="handleLogin"
                        >
                    </div>

                    <span v-if="error" class="d-block invalid-feedback text-center">
                        {{ errorMessage }}
                    </span>

                    <button
                        class="btn btn-primary btn-block mt-4 text-white"
                        @click="handleLogin"
                    >
                        <Loader v-if="isLoading" color="light"/>
                        
                        <span v-else>Iniciar Sesión</span>
                    </button>

                    <p class="mt-3 text-justify">
                        ¿Aún no tienes una cuenta?,
                        <router-link :to="{ name: 'register' }">
                            registrate
                        </router-link>
                        y disfruta de los beneficios.
                    </p>

                    <a href="" class="text-center d-block">
                        Olvide mi contraseña
                    </a>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions('authModule', ['login', 'checkRole']),
        ...mapGetters('authModule', ['userRole']),
        async handleLogin(){
            if( !this.email.length && !this.password.length )
                return

            const roleHome = {
                admin: 'administrar-contenido',
                client: 'client-profile'
            }

            const isLogged = await this.login( { email: this.email, password: this.password } )
            await this.checkRole()

            if( isLogged )
                this.$router.push({ name: roleHome[ this.userRole() ] })

        }
    },
    computed: {
        ...mapState('authModule', ['error', 'errorMessage']),
        ...mapState(['isLoading'])
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