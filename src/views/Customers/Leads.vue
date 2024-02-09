<template>
    <div class="custom-content mb-4">
        <div class="custom-wrapper p-4 mb-4">
            <NavBar :page="currentPage"></NavBar>

            <h4 class="mt-4">
                Leads
            </h4>
            <hr />

            <div class="mt-4">
                <b-card>
                    <b-table bordered striped hover outlined :fields="fields" :items="customers" responsive :busy="isBusy"
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
    name: "Leads",
    components: {
        NavBar,
    },
    data() {
        return {
            currentPage: 'Leads',
            isBusy: false,

            page: 1,
            size: 10,
            totalItems: 0,
            totalPages: 0,

            customers: null,
            fields: ["customerName", "sex", "phoneNumber", "email", "createdAt"],
        }
    },
    created() {
        this.fetchCustomers()
    },


    methods: {
        fetchCustomers() {
            let that = this

            this.isBusy = true

            api.customers("PENDING", this.page - 1, this.size)
                .then((response) => {
                    that.customers = response.data.content

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
            this.fetchCustomers()
        },


    }
}
</script>