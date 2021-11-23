<template>
    <div class="container my-5">
        <div class="row">

            <Loader v-if="isLoading" class="mx-auto" />

            <div v-else class="card col-md-8 mx-auto py-5 px-2 shadow border-0">

                <h2 class="mb-4 text-center">Ingresar un pedido</h2>
                <div class="row justify-content-center">

                    <div class="card col-10 col-md-8 col-lg-5 p-4 shadow border-0">
                        <form @submit.prevent>

                            <div class="form-group">
                                <label class="text-primary" for="quantity">Cantidad:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    placeholder="0"
                                    class="form-control"
                                    v-model.trim="$v.order.quantity.$model"
                                >
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
                                <label class="text-primary" for="address">Dirección:</label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Dirección de entrega"
                                    class="form-control"
                                    v-model.trim="$v.order.address.$model"
                                >
                                <span
                                    class="d-block invalid-feedback"
                                    v-if="$v.order.$dirty && !$v.order.address.required"
                                >
                                    Es necesario indicar la dirección de entrega
                                </span>
                            </div>

                            <div class="form-group">
                                <label class="text-primary" for="phone">Teléfono:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Número de teléfono"
                                    class="form-control"
                                    v-model.trim="$v.order.phone.$model"
                                >
                                <span
                                    class="d-block invalid-feedback"
                                    v-if="$v.order.$dirty && !$v.order.phone.required"
                                >
                                    Es necesario indicar el número de teléfono.
                                </span>
                                <span
                                    class="d-block invalid-feedback"
                                    v-if="!$v.order.phone.minLength"
                                >
                                    El número de teléfono debe de tener mínimo {{ $v.order.phone.$params.minLength.min }} digitos.
                                </span>
                                <span
                                    class="d-block invalid-feedback"
                                    v-if="!$v.order.phone.maxLength"
                                >
                                    El número de teléfono puede de tener máximo {{ $v.order.phone.$params.maxLength.max }} digitos.
                                </span>
                            </div>

                            <div class="form-group">
                                <label class="text-primary" for="date">Fecha:</label>
                                <input
                                    type="date"
                                    id="date"
                                    class="form-control"
                                    v-model.trim="$v.order.date.$model"
                                >
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

                            <button
                                class="btn btn-primary btn-block text-white"
                                @click="handleMakeOrder"
                                :disabled="$v.order.$invalid"
                            >
                                <Loader v-if="formLoading" />
                                <span v-else>Hacer pedido</span>
                            </button>

                        </form>
                    </div>

                <h2 class="col-12 text-center my-5">Historial de pedidos</h2>
                <div class="card shadow border-0 mx-auto col-10">
                    <div class="card-body">
                        <table class="w-100">
                            <thead>
                                <th class="text-left">Realizados por</th>
                                <th class="text-center">Garrafones</th>
                                <th class="text-center">Total</th>
                            </thead>
                            
                            <tbody>
                                <tr
                                    v-for="({ user_type, quantity, total }, index) in getOrdersData"
                                    :key="index"
                                >
                                    <td class="text-left">{{ user_type }}</td>
                                    <td class="text-center">{{ quantity }}</td>
                                    <td class="text-center">{{ currencyFormatter.format( total ) }}</td>
                                </tr>
                                <tr class="text-center font-weight-bold border border-primary border-left-0 border-bottom-0 border-right-0">
                                    <td class="text-left">Totales</td>
                                    <td class="text-center">{{ getOrdersTotals.quantity }}</td>
                                    <td class="text-center">{{ currencyFormatter.format( getOrdersTotals.total ) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { required, minValue, maxValue, minLength, maxLength, helpers } from 'vuelidate/lib/validators'
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
            order: {
                quantity: null,
                address: '',
                phone: '',
                date: null
            },
            currencyFormatter: CurrencyFormatter,
            formLoading: false,
        }
    },
    validations: {
        order: {
            quantity: {
                required,
                minValue: minValue(1),
                maxValue: maxValue(50)
            },
            address: {
                required
            },
            phone: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(10)
            },
            date: {
                required,
                minDate,
                maxDate: maxDate(5),
            }
        }
    },
    methods: {
        ...mapActions('adminModule', ['loadOrders', 'fetchProductPrice', 'makeOrder']),
        async handleMakeOrder(){

            this.$v.$touch()

            if( this.$v.$invalid ) return

            this.formLoading = true
            const hasBeebOrderCreated = await this.makeOrder(this.order)

            if(hasBeebOrderCreated){
                this.order = {
                    quantity: null,
                    address: '',
                    phone: '',
                    date: null,
                }

                this.$v.order.$reset()
            }

            this.$swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                title: hasBeebOrderCreated ? 'Pedido realizado' : 'No se ha podido realizar el pedido, asegurese de que el precio del producto está definido.',
                icon: hasBeebOrderCreated ? 'success' : 'error',
                timer: 3000
            })

            this.formLoading = false
        }
    },
    computed: {
        ...mapState(['isLoading']),
        ...mapState('adminModule', ['product_price']),
        ...mapGetters('adminModule', ['getOrdersData', 'getOrdersTotals'])
    },
    async created(){
        await Promise.all([
            this.fetchProductPrice(),
            this.loadOrders()
        ])
    },
    components: {
        Loader: () => import('../../shared/components/Loader.vue')
    }
}
</script>