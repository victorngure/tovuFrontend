<template>
    <div class="custom-content mb-4">
        <div class="custom-wrapper p-4 mb-4">
            <NavBar :page="currentPage"></NavBar>

            <h3 class="mt-4">
                Payments
            </h3>
            <hr />

            <div class="mt-4">
                <b-card>
                    <b-table bordered striped hover outlined :fields="fields" :items="payments" responsive :busy="isBusy"
                        show-empty ref="table">

                        <template #table-busy>
                            <div class="text-center my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                        </template>
                    </b-table>

                    <b-pagination v-model="page" :total-rows="totalItems" :per-page="size" @change="changePage($event)"
                        align="right"></b-pagination>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/apis/api"
import NavBar from "@/components/NavBar.vue"

export default {
    name: "Customers",
    components: {
        NavBar,
    },
    data() {
        return {
            currentPage: 'Payments',
            isBusy: false,

            page: 1,
            size: 10,
            totalItems: 0,
            totalPages: 0,

            payments: null,
            fields: ["customerName", "phoneNumber", "createdAt", "amount", "status"],
        }
    },
    created() {
        this.fetchPayments()
    },


    methods: {
        fetchPayments() {
            let that = this

            this.isBusy = true

            api.payments(this.page - 1, this.size)
                .then((response) => {
                    that.payments = response.data.content

                    that.page = response.data.pageable.pageNumber + 1
                    that.size = response.data.pageable.pageSize

                    that.totalItems = response.data.totalElements
                    that.totalPages = response.data.totalPages

                    this.isBusy = false
                })
                .catch((error) => {
                    this.isBusy = false
                    that.showError(error)
                })
        },

        changePage(e) {
            this.page = e
            this.fetchPayments()
        },
    }
}
</script>