<template>
    <div class="custom-content mb-4">
        <div class="custom-wrapper p-4 mb-4">
            <NavBar :page="currentPage"></NavBar>

            <h4 class="mt-4">
                Customers
            </h4>
            <hr />

            <div class="mt-4">
                <b-card>
                    <b-table bordered striped hover outlined :fields="fields" :items="customers" responsive :busy="isBusy"
                        show-empty ref="table">
                        <template #cell(action)="row">
                            <div class="d-flex justify-content-center">
                                <b-dropdown text="Action" size="sm">
                                    <b-dropdown-item href="#" @click="showModal(row.item)">View Details</b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </template>

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

            <b-sidebar id="sidebar-1" title="Sidebar" backdrop v-model="sidebar" right no-header width="50%">
                <b-tabs nav-class="nav-scrollable" class="p-4" card v-if="selectedCustomer != null">
                    <b-tab title="Personal Details" active>
                        <div class="py-4">
                            <b-card class="custom-card" v-if="selectedCustomer != null">
                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Full Names</p>
                                        <p>{{ selectedCustomer.customerName }}</p>
                                    </b-col>
                                    <b-col>
                                        <p class="fw-bold mb-2">Trading As</p>
                                        <p>{{ selectedCustomer.tradingAs }}</p>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Gender</p>
                                        <p>{{ selectedCustomer.sex }}</p>
                                    </b-col>
                                    <b-col>
                                        <p class="fw-bold mb-2">Date of Birth</p>
                                        <p>{{ selectedCustomer.dob }}</p>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Phone Number</p>
                                        <p>{{ selectedCustomer.phoneNumber }}</p>
                                    </b-col>
                                    <b-col>
                                        <p class="fw-bold mb-2">Email</p>
                                        <p>{{ selectedCustomer.email }}</p>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Marital Status</p>
                                        <p>{{ selectedCustomer.maritalStatus }}</p>
                                    </b-col>
                                    <b-col>
                                        <p class="fw-bold mb-2">KRA PIN</p>
                                        <p>{{ selectedCustomer.kraPin }}</p>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Identification Document</p>
                                        <p>{{ selectedCustomer.identificationDocument }}</p>
                                    </b-col>

                                    <b-col>
                                        <template v-if="selectedCustomer.identificationDocument == 'National Id'">
                                            <p class="fw-bold mb-2">National Id</p>
                                            <p>{{ selectedCustomer.nationalId }}</p>
                                        </template>

                                        <template v-else>
                                            <p class="fw-bold mb-2">Passport Number</p>
                                            <p>{{ selectedCustomer.passportNumber }}</p>
                                        </template>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Occupation</p>
                                        <p>{{ selectedCustomer.occupation }}</p>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </div>
                    </b-tab>

                    <b-tab title="Residence">
                        <div class="py-4">
                            <b-card class="custom-card" v-if="selectedCustomer != null">
                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Country</p>
                                        <p>{{ selectedCustomer.country }}</p>
                                    </b-col>

                                    <b-col>
                                        <p class="fw-bold mb-2">Town/City</p>
                                        <p>{{ selectedCustomer.residence }}</p>
                                    </b-col>                                    
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Residence Type</p>
                                        <p>{{ selectedCustomer.residenceType }}</p>
                                    </b-col>

                                    <b-col>
                                        <p class="fw-bold mb-2">Estate</p>
                                        <p>{{ selectedCustomer.estate }}</p>
                                    </b-col>                                
                                </b-row>

                                <b-row>                                   
                                    <b-col>
                                        <p class="fw-bold mb-2">House Number</p>
                                        <p>{{ selectedCustomer.houseNumber }}</p>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </div>
                    </b-tab>

                    <b-tab title="Next of Kin">
                        <div class="py-4">
                            <b-card class="custom-card" v-if="selectedCustomer != null">
                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Name of Next of Kin</p>
                                        <p>{{ selectedCustomer.kinName }}</p>
                                    </b-col>
                                    <b-col>
                                        <p class="fw-bold mb-2">Relationship</p>
                                        <p>{{ selectedCustomer.kinRelationship }}</p>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Phone Number</p>
                                        <p>{{ selectedCustomer.kinPhone }}</p>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </div>
                    </b-tab>

                    <b-tab title="Payment Details">
                        <template v-if="customerPayments != null">
                            <div class="py-4">
                                <template v-if="customerPayments.length">
                                    <div v-for=" (payment, index) in customerPayments">
                                        <b-card class="custom-card" v-if="selectedCustomer != null">
                                            <b-row>
                                                <b-col>
                                                    <p class="fw-bold mb-2">Billing Number</p>
                                                    <p>{{ payment.phoneNumber }}</p>
                                                </b-col>
                                                <b-col>
                                                    <p class="fw-bold mb-2">Transaction Date</p>
                                                    <p>{{ payment.createdAt }}</p>
                                                </b-col>
                                            </b-row>

                                            <b-row>
                                                <b-col>
                                                    <p class="fw-bold mb-2">Status</p>
                                                    <p>{{ payment.status }}</p>
                                                </b-col>
                                                <b-col>
                                                    <p class="fw-bold mb-2">Transaction Id</p>
                                                    <p>{{ payment.transactionId }}</p>
                                                </b-col>
                                            </b-row>

                                            <b-row>
                                                <b-col>
                                                    <p class="fw-bold mb-2">Amount</p>
                                                    <p>KSH. {{ payment.amount }}</p>
                                                </b-col>
                                            </b-row>
                                        </b-card>
                                    </div>
                                    <hr />
                                </template>

                                <template v-else>
                                    <b-alert variant="warning" show>No payments found</b-alert>
                                </template>
                            </div>


                        </template>
                    </b-tab>

                    <b-tab title="Other Details">
                        <div class="py-4">
                            <b-card class="custom-card" v-if="selectedCustomer != null">
                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Referral Source</p>
                                        <p>{{ selectedCustomer.referralSource }}</p>
                                    </b-col>
                                    <b-col>
                                        <p class="fw-bold mb-2">Referred By</p>
                                        <p>{{ selectedCustomer.referralName }}</p>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <p class="fw-bold mb-2">Reason for joining</p>
                                        <p>{{ selectedCustomer.joinReason }}</p>
                                    </b-col>

                                    <b-col>
                                        <p class="fw-bold mb-2">Product Preference</p>
                                        <p>{{ selectedCustomer.productPreference }}</p>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </div>
                    </b-tab>
                </b-tabs>

                <template #footer="{ hide }">
                    <div class="d-flex text-light align-items-center px-3 py-2">
                        <strong class="mr-auto"></strong>
                        <b-button class="custom-no-radius" variant="outline-secondary" size="sm"
                            @click="hideModal()">Close</b-button>
                    </div>
                </template>
            </b-sidebar>
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
            currentPage: 'Customers',
            isBusy: false,

            page: 1,
            size: 10,
            totalItems: 0,
            totalPages: 0,

            customers: null,
            fields: ["customerName", "sex", "phoneNumber", "nationalId", "createdAt", "action"],

            sidebar: false,
            selectedCustomer: null,
            customerPayments: null
        }
    },
    created() {
        this.fetchCustomers()
    },


    methods: {
        fetchCustomers() {
            let that = this

            this.isBusy = true

            api.customers("PAID", this.page - 1, this.size)
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

        showModal(item) {
            this.selectedCustomer = item
            this.sidebar = true

            this.getCustomerPayments()
        },

        hideModal() {
            this.selectedCustomer = null
            this.sidebar = false
            this.customerPayments = null
        },

        getCustomerPayments() {
            let that = this

            api.customerPayments(this.selectedCustomer.customerId)
                .then((response) => {
                    that.customerPayments = response.data
                })
                .catch((error) => {
                    that.showError(error)
                })
        }
    }
}
</script>