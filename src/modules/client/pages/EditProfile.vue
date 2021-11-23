<template>
    <div class="container my-5">
        <div class="row">

            <div class="col-10 col-md-5 card mx-auto shadow border-0 py-4">

                <h1 class="text-center">Editar perfil</h1>

                <div class="card-body">

                    <form @submit.prevent>

                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Name"
                                class="form-control"
                                v-model="name"
                            >
                        </div>

                        <div class="form-group">
                            <label for="lastname">Lastname:</label>
                            <input
                                type="text"
                                id="lastname"
                                placeholder="Lastname"
                                class="form-control"
                                v-model="lastname"
                            >
                        </div>

                        <div class="form-group">
                            <label for="phone_number">Phone number:</label>
                            <input
                                type="phone"
                                id="phone_number"
                                placeholder="Phone number"
                                class="form-control"
                                v-model="phone"
                            >
                        </div>

                        <div class="form-group">
                            <label for="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Address"
                                class="form-control"
                                v-model="address"
                            >
                        </div>

                        <button class="btn btn-warning btn-block" @click="editProfile">
                            <Loader v-if="isLoading" color="dark" />
                            <span v-else>Save</span>
                        </button>

                    </form>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data(){
        return {
            name: '',
            lastname: '',
            phone: '',
            address: '',
            isLoading: false,
        }
    },
    methods: {
        ...mapActions('clientModule', ['loadProfileData', 'updateProfileData']),
        async editProfile(){
            
            this.isLoading = true

            const profileData = {
                name: this.name,
                lastname: this.lastname,
                phone: this.phone,
                address: this.address
            }

            const profileUpdatedSuccessfully = await this.updateProfileData(profileData)

            this.$swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                title: `${ profileUpdatedSuccessfully
                    ? 'Perfil actualizado satisfactoriamente.'
                    : 'Ocurrió un error, vuelva a intentarlo.'
                }`,
                icon: `${ profileUpdatedSuccessfully
                    ? 'success'
                    : 'error'
                }`,
                timer: 3000,
            })

            this.isLoading = false


        }
    },
    computed: {
        ...mapGetters('clientModule', ['getProfileData'])
    },
    async created(){

        await this.loadProfileData()

        const { name, lastname, phone, address } = this.getProfileData

        this.name = name
        this.lastname = lastname
        this.phone = phone
        this.address = address

    },
    components: {
        Loader: () => import('../../shared/components/Loader.vue')
    }
}
</script>