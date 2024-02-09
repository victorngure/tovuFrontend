<template>
    <div class="custom-content mb-4">
        <div class="custom-wrapper p-4 mb-4">
            <NavBar :page="currentPage"></NavBar>

            <h3 class="mt-4">
                Dashboard
            </h3>
            <hr />

            <div class="mt-4">
                <b-overlay :show="customerCount == null || paymentsCount == null">
                    <b-row>
                        <b-col lg="6">
                            <b-card>
                                <label class="text-muted">Total Registered Customers</label>
                                <h3>{{ customerCount }}</h3>
                            </b-card>
                        </b-col>

                        <b-col lg="6">
                            <b-card>
                                <label class="text-muted">Total Successful Payments</label>
                                <h3>KSh. {{ paymentsCount }}</h3>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-overlay>
                
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/apis/api"
import NavBar from "@/components/NavBar.vue"

export default {
    name: "Dashboard",
    components: {
        NavBar,
    },
    data() {
        return {
            currentPage: 'Dashboard',
            customerCount: null,
            paymentsCount: null
        }
    },

    created() {
        this.getCustomerCount()
        this.getPaymentCount()
    },

    methods: {
        getCustomerCount() {
            let that = this

            api.customerCount()
                .then((response) => {
                    that.customerCount = response.data
                })
                .catch((error) => {
                    that.showError(error)
                })
        },

        getPaymentCount() {
            let that = this

            api.paymentCount()
                .then((response) => {
                    that.paymentsCount = response.data
                })
                .catch((error) => {
                    that.showError(error)
                })
        }
    }
}
</script>