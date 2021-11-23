<template>
    <div>
        <div class="parallax text-white">
            <div class="d-flex h-100 align-items-center justify-content-center">
                <div class="col-10 h-75 text-center">
                    <div class="row d-flex h-75 align-items-center justify-content-center">
                        <h1 class="col-12">Tan fácil como solicitar agua desde tu celular</h1>

                        <h2 class="col-12">Si hay magia en este planeta, está contenida en nuestra agua</h2>

                        <button
                            class="btn btn-primary text-white"
                            @click="$router.push({ name: 'register' })"
                        >
                            Empezar a realizar pedidos
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <AboutSection id="about" />

        <ContactSection id="contact" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    components: {
        AboutSection: () => import('../components/AboutSection.vue'),
        ContactSection: () => import('../components/ContactSection.vue')
    },
    methods: {
        ...mapActions('guestModule', ['loadLandingContent'])
    },
    async created(){
        await this.loadLandingContent()
    }
}
</script>

<style scoped>
.parallax{
    height: 100vh;
    background-image: url('../../../assets/main-image.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

h1{
    font-size: 64px;
}

h2{
    font-size: 32px;
}
</style>