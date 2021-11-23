<template>
    <div class="container my-5">
        <div class="row">

            <Loader v-if="isLoadingUserInfo || !profileHasData" class="mx-auto" />

            <div v-else class="col-lg-8 mx-auto">
                <div class="card shadow p-5 border-0">
                    <div class="row">

                        <div class="col-12">
                            <h2>Perfil</h2>

                            <div class="row mb-4">
                                <div class="col-md-2">
                                    <div class="initials-circle">
                                        {{ initials }}
                                    </div>
                                </div>

                                <div class="col">
                                    <p>
                                        <i class="fas fa-user text-primary"></i>
                                        {{ fullname }}
                                    </p>
                                    <p>
                                        <i class="fas fa-phone-alt text-primary"></i>
                                        {{ phoneFormatted }}
                                        </p>
                                    <p>
                                        <i class="fas fa-map-marker-alt text-primary"></i>
                                        {{ address }}
                                    </p>
                                </div>
                            </div>

                            <button class="btn btn-warning btn-sm" @click="$router.push({ name: 'edit-profile' })">
                                Editar información
                                <i class="fas fa-user-edit"></i>
                            </button>

                        </div>

                        <div class="col-12 mt-4">
                            <h2>Pedidos</h2>
                            <button
                                v-b-modal.make-order
                                class="btn btn-primary btn-sm text-white"
                            >
                                Hacer un pedido
                                <i class="fas fa-shopping-bag"></i>
                            </button>

                            <b-modal id="make-order" title="Hacer pedido" centered>

                                <form class="px-4">
                                    <div class="form-group">
                                        <label for="quantity">Cantidad:</label>
                                        <input type="number" id="quantity" placeholder="0" class="form-control" v-model.trim="$v.order.quantity.$model">
                                        <span
                                            class="d-block invalid-feedback"
                                            v-if="$v.order.$dirty && !$v.order.quantity.required"
                                        >
                                            Es necesario indicar la cantidad de garrafones.
                                        </span>
                                        <span
                                            class="d-block invalid-feedback"
                                            v-if="!$v.order.quantity.minValue"
                                        >
                                            Al menos debe de pedir {{ $v.order.quantity.$params.minValue.min }} garrafón.
                                        </span>
                                        <span
                                            class="d-block invalid-feedback"
                                            v-if="!$v.order.quantity.maxValue"
                                        >
                                            Por el momento solo puede pedir {{ $v.order.quantity.$params.maxValue.max }} garrafones como máximo.
                                        </span>
                                    </div>

                                    <div class="form-group">
                                        <label for="date">Fecha:</label>
                                        <input type="date" id="date" class="form-control" v-model.trim="$v.order.date.$model">
                                        <span
                                            class="d-block invalid-feedback"
                                            v-if="$v.order.date.$dirty && !$v.order.date.required"
                                        >
                                            Es necesario indicar la fecha de entrega.
                                        </span>
                                        <span
                                            class="d-block invalid-feedback"
                                            v-if="!$v.order.date.minDate"
                                        >
                                            La fecha mínima de entrega es el día actual.
                                        </span>
                                        <span
                                            class="d-block invalid-feedback"
                                            v-if="!$v.order.date.maxDate"
                                        >
                                            Fecha máxima de entrega: {{ $v.order.date.$params.maxDate.max }} ( 5 días a partir de hoy ).
                                        </span>
                                    </div>

                                    <p>
                                        <span class="text-primary">Total:</span> {{ currencyFormatter.format( order.quantity * product_price ) }}
                                    </p>
                                </form>
                                
                                <template #modal-footer="{ ok, cancel }">
                                    <div class="w-100 row justify-content-around">
                                        <button
                                            class="btn btn-danger btn-sm mx-4"
                                            @click="cancel()"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            class="btn btn-primary btn-sm text-white mx-4"
                                            @click="handleMakeOrder(ok)"
                                            :disabled="$v.order.$invalid"
                                        >
                                            Hacer pedido
                                        </button>
                                    </div>
                                </template>
                            </b-modal>
                        </div>

                        <div class="col-12 mt-4">
                            <h3>Consulta tus pedidos del periodo que desees.</h3>
                            <div class="row">

                                <div class="col-12">
                                    <form @submit.prevent>
                                        <div class="row d-flex align-items-center">
                                            <div class="form-group col-md-5">
                                                <label for="from" class="text-primary">Desde:</label>
                                                <input
                                                    type="date"
                                                    id="from"
                                                    class="form-control"
                                                    v-model.trim="$v.from.$model"
                                                >
                                                <span v-if="$v.from.$dirty && !$v.from.required" class="d-block invalid-feedback">
                                                    Es necesario indicar la fecha de inicio.
                                                </span>
                                            </div>
                                            <div class="form-group col-md-5">
                                                <label for="to" class="text-primary">Hasta:</label>
                                                <input
                                                    type="date"
                                                    id="to"
                                                    class="form-control"
                                                    v-model.trim="$v.to.$model"
                                                >
                                                <span v-if="$v.to.$dirty && !$v.to.required" class="d-block invalid-feedback">
                                                    Es necesario indicar la fecha de fin.
                                                </span>
                                            </div>

                                            <div class="from-group col-md-2 p-md-0 mt-md-3">
                                                <button
                                                    class="btn btn-primary btn-sm btn-block text-white"
                                                    @click="searchOrders"
                                                    :disabled="$v.$invalid || !validDateRange"
                                                >
                                                    <Loader v-if="isLoading" />
                                                    <span v-else>Consultar</span>
                                                </button>
                                            </div>
                                        </div>
                                        <span v-if="!validDateRange" class="d-block invalid-feedback">
                                            La fecha de inicio debe ser menor a la fecha de fin.
                                        </span>
                                    </form>
                                </div>

                                <div class="col-md-8 card shadow border-0 mx-auto mt-4">
                                    <div class="card-body orders-details">
                                        <h3 class="text-center mb-3">Historial de pedidos</h3>

                                        <div class="orders-board mb-md-3">
                                            <div v-if="!orders.length" class="alert alert-info text-center">
                                                No se encontraron pedidos
                                            </div>
                                            <div
                                                v-else
                                                v-for="({ date, quantity, total }, index) of orders"
                                                :key="index"
                                                class="mb-3 border-bottom border-primary"
                                            >
                                                <p>
                                                    Fecha: {{ date }}
                                                </p>
                                                <p>
                                                    Cantidad: {{ quantity }} {{ quantity > 1 ? 'garrafones' : 'garrafón' }}
                                                </p>
                                                <p>
                                                    Total: {{ total }}
                                                </p>
                                            </div>
                                        </div>

                                        <h3 class="text-center">Totales</h3>

                                        <p>
                                            Garrafones del periodo: {{ ordersQuantity }} garrafones
                                        </p>
                                        <p>
                                            Total: {{ ordersTotal }}
                                        </p>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>    
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { required, integer, minValue, maxValue, helpers } from 'vuelidate/lib/validators'
import CurrencyFormatter from '../../../helpers/CurrencyFormatter'

const minDate = (value) => {

    if(!value) return true
        
    const timeZone = 'es-MX'
    const orderDate = new Date( value.replaceAll('-', '/') ).toLocaleDateString( timeZone )

    return orderDate >= new Date().toLocaleDateString( timeZone )
    
}

const maxDate = (maxDays) => {

    const today = new Date()
    const maxDate = new Date( today.getFullYear(), today.getMonth(), today.getDate() + maxDays )

    return helpers.withParams(
        { type: 'maxDate',  max: maxDate.toLocaleDateString('es-MX') },
        (value) => new Date(value) <= maxDate
    )

}

export default {

    data(){
        return {
            name: '',
            lastname: '',
            phone: '',
            address: '',
            from: null,
            to: null,
            isLoadingUserInfo: false,
            order: {
                quantity: null,
                date: null
            },
            currencyFormatter: CurrencyFormatter
        }
    },
    validations: {
        from: { required },
        to: { required },
        order: {
            quantity: {
                required,
                integer,
                minValue: minValue(1),
                maxValue: maxValue(50)
            },
            date: {
                required,
                minDate,
                maxDate: maxDate(5),
            }
        }
    },
    methods: {
        ...mapActions('clientModule', ['loadProfileData', 'loadUserOrders', 'makeOrder', 'fetchProductPrice']),
        async searchOrders(){

            this.$v.$touch()
            
            if( this.$v.$invalid || !this.validDateRange ) return
            
            await this.loadUserOrders({
                from: this.from,
                to: this.to
            })
        },
        async handleMakeOrder(closeModal){

            this.$v.order.quantity.$touch()
            this.$v.order.date.$touch()

            if( this.$v.order.$invalid ) return

            closeModal()

            const hasBeebOrderCreated = await this.makeOrder(this.order)

            if(hasBeebOrderCreated){
                this.order = {
                    quantity: null,
                    date: null
                }

                this.$v.order.$reset()
            }

            this.$swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                title: hasBeebOrderCreated ? 'Pedido realizado' : 'No se ha podido realizar el pedido, intente nuevamente',
                icon: hasBeebOrderCreated ? 'success' : 'error',
                timer: 3000
            })
        }
    },
    computed: {
        ...mapState(['isLoading']),
        ...mapState('clientModule', ['orders', 'ordersQuantity', 'ordersTotal', 'product_price']),
        ...mapGetters('clientModule', ['getProfileData', 'profileHasData']),
        fullname(){
            return `${ this.name } ${ this.lastname }`
        },
        initials(){
            return `${ this.name[0] }${ this.lastname[0] }`
        },
        phoneFormatted(){
            const phoneArray = this.phone.split('')
            return `${ phoneArray.slice(0, 3).join('') }-${ phoneArray.slice(3, 6).join('') }-${ phoneArray.slice(6).join('') }`
        },
        validDateRange(){

            return ( this.from === null && this.to === null )
                ? true
                : this.from < this.to
        }
    },
    async created(){

        this.isLoadingUserInfo = true

        await Promise.all([
            this.loadProfileData(),
            this.loadUserOrders({}),
            this.fetchProductPrice()
        ])

        if( !this.profileHasData ){
            this.$swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                icon: 'warning',
                title: 'Antes de continuar por favor ingresa la información de tu perfil, es necesaria para realizar las entregas.',
                timer: 7000
            }).then(() => {
                this.$router.push({ name: 'edit-profile' })
                return
            })
        }

        const { name, lastname, phone, address } = this.getProfileData

        this.name = name
        this.lastname = lastname
        this.phone = phone
        this.address = address

        this.isLoadingUserInfo = false
        
    },
    components: {
        Loader: () => import('../../shared/components/Loader.vue')
    }
}
</script>

<style scoped>

.initials-circle{
    align-items: center;
    background: gainsboro;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    height: 6rem;
    justify-content: center;
    width: 6rem;
}

.orders-details{
    max-height: 35rem;
    overflow: hidden;
}

.orders-board{
    max-height: 60%;
    overflow: scroll;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

button{
    flex-grow: 1;
}

</style>