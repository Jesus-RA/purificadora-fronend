<template>
    <div class="container my-5">
        <div class="row justify-content-center">

            <Loader v-if="isLoading" />

            <div v-else class="col-11 col-md-7 col-lg-4 card shadow border-0 p-0">

                <div class="card-body py-5 px-4">
                    <h2 class="text-center mb-4">
                        Contenido de la página
                    </h2>                

                    <!-- <div class="form-group mt-4">
                        <label
                            for="main_image"
                            class="text-primary"
                        >
                            Imagén de la página principal:
                        </label>
                        <input
                            id="main_image"
                            type="text"
                            class="form-control"
                            placeholder="www.image.com"
                            v-model="main_image"
                        >
                    </div> -->

                    <div class="form-group mt-4">
                        <label
                            for="gallery_images"
                            class="text-primary"
                        >
                            Galería de imágenes:
                        </label>

                        <!-- <input
                            type="text"
                            class="form-control"
                            placeholder="www.image.com"
                            v-model="gallery_images"
                        > -->
                        <textarea
                            id="gallery_images"
                            rows="3"
                            class="form-control"
                            placeholder="Lista los enlaces de la galería de imágenes, separalos usando una coma ','"
                            v-model="gallery_images"
                        ></textarea>
                        <small class="d-block text-justify">
                            Separa cada enlace de la galería de imágenes usando una coma ','.
                        </small>
                    </div>

                    <div class="form-group mt-4">
                        <label
                            for="video"
                            class="text-primary"
                        >
                            Vídeo de proceso:
                        </label>
                        <input
                            type="text"
                            id="video"
                            class="form-control"
                            placeholder="www.video.com"
                            v-model="video"
                        >
                    </div>

                    <div class="form-group mt-4">
                        <label
                            for="phone"
                            class="text-primary"
                        >
                            Teléfono de contacto:
                        </label>
                        <input
                            type="text"
                            id="phone"
                            class="form-control"
                            placeholder="Teléfono de contacto"
                            v-model="phone"
                        >
                    </div>

                    <div class="form-group mt-4">
                        <label
                            for="product_price"
                            class="text-primary"
                        >
                            Precio del product:
                        </label>
                        <input
                            type="number"
                            id="product_price"
                            class="form-control"
                            placeholder="00.00"
                            v-model="product_price"
                        >
                    </div>

                    <button
                        class="btn btn-primary btn-block mt-4 text-white"
                        @click="saveChanges"
                    >
                        <Loader v-if="loading" />
                        <span v-else>Guardar Cambios</span>
                    </button>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    data(){
        return {
            main_image: '',
            gallery_images: [],
            video: '',
            phone: '',
            product_price: null,
            loading: false,
        }
    },
    methods: {
        ...mapActions('adminModule', ['loadCompanyData', 'storeCompanyData']),
        async saveChanges(){

            this.loading = true

            const data = {
                main_image: this.main_image,
                gallery_images: this.gallery_images,
                video: this.video,
                phone: this.phone,
                product_price: this.product_price
            }

            const hasBeenDataSaved = await this.storeCompanyData(data)

            this.$swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                title: hasBeenDataSaved ? 'La información ha sido guardada.' : 'Ocurrió un error, por favor vuelva a intentarlo.',
                icon: hasBeenDataSaved ? 'success' : 'error',
                timer: 3000
            })

            this.loading = false

        }
    },
    computed: {
        ...mapState(['isLoading']),
        ...mapGetters('adminModule', ['getCompanyData']),
    },
    async created(){
        await this.loadCompanyData()
        const companyData = this.getCompanyData

        this.main_image = companyData.main_image
        this.gallery_images = companyData.gallery_images
        this.video = companyData.video
        this.phone = companyData.phone
        this.product_price = companyData.product_price
    },
    components: {
        Loader: () => import('../../shared/components/Loader.vue')
    }
}
</script>