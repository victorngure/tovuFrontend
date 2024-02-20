<template>
    <div>
        <b-card>
            <b-row>
                <b-col lg="12" sm="12">
                    <label>Payment Method</label>
                    <b-card>
                        <div class="d-flex align-items-center">
                            <b-form-checkbox v-model="status" :disabled="true"></b-form-checkbox>
                            <img src="@/assets/img/mpesa.png" width="auto" height="32px" />
                        </div>
                    </b-card>

                    <div class="float-right mt-4">
                        <label class="text-muted text-right mb-0">Total Amount</label>
                        <h4 class="text-right">KES {{ amount }}</h4>
                    </div>

                </b-col>
            </b-row>

            <div class="float-right mt-4">
                <b-button-group class="float-right" size="sm">
                    <b-button class="px-2 mt-2 mr-1" @click="back()">Back</b-button>
                    <b-button class="px-4 mt-2" variant="primary" @click="showModal()">Pay Now</b-button>
                </b-button-group>
                
            </div>
        </b-card>

        <b-modal v-model="modal" title="Make payment request" hide-footer @hide="onModalHidden">
            <template v-if="paymentStatus == null">
                <div class="d-flex justify-content-center fw-bold" v-if="loading">
                    <label class="text-muted text-center">Please wait as we verify your payment.</label>
                </div>

                <b-overlay :show="loading">
                    <b-alert variant="info" class="text-center" show>
                        Upon clicking
                        <span class="fw-bold">Request Payment</span>
                        a prompt will be sent to the provided phone number. Complete the payment by entering your Mpesa PIN.
                    </b-alert>

                    <div class="d-flex flex-column">
                        <b-form-group class="mb-0" label="Billing Number">
                            <b-form-input type="number" v-model="phoneNumber"></b-form-input>
                        </b-form-group>

                        <div class="d-flex justify-content-center" v-if="checkbox">
                            <b-button class="mt-4" variant="primary" :disabled="submitBtn" @click="submitPayment()">{{ btnText }}</b-button>
                        </div>                 

                        <div class="mt-4"><hr class="my-0" />       
                            <b-form-checkbox v-model="checkbox" class="text-muted mt-2"> 
                                <small class="">
                                    By proceeding with the payment of Ksh 1000 as a non-refundable membership registration fee, 
                                    you confirm your agreement to abide by the terms and conditions of TOVU SACCO membership
                                </small>
                            </b-form-checkbox>
                        </div>
                    </div>
                </b-overlay>
            </template>

            <template v-else-if="paymentStatus == 'Success'">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/img/success.png" width="80px" />
                </div>

                <p class="text-center text-muted mt-4">Your payment has been received successfully!</p>
            </template>

            <template v-else-if="paymentStatus == 'Error'">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/img/error.png" width="80px" />
                </div>

                <p class="text-center text-muted mt-4">
                    There has been an error with your payment.
                    {{ paymentStatusDescription }}
                </p>

                <div class="d-flex justify-content-center">
                    <b-button variant="secondary" @click="clear()">Retry Payment</b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import api from "@/apis/api"
import { mapMutations, mapGetters } from 'vuex'

export default {
    data() {
        return {
            amount: "1000",
            customerReference: null,
            phoneNumber: null,
            btnText: "Request Payment",
            modal: false,
            status: true,
            submitBtn: false,
            paymentReference: null,
            loading: false,
            interval: null,
            count: 0,
            paymentStatus: null,
            paymentStatusDescription: null,
            checkbox: true,
        };
    },

    computed: {
        ...mapGetters(['getCustomerDetails']),
    },

    mounted() {
        if (this.getCustomerDetails == null) {
            this.showError("Customer details could not be found!")
            this.$emit('previous')
        }
        else {
            this.customerReference = this.getCustomerDetails.customerReference
            this.phoneNumber = this.getCustomerDetails.phoneNumber
        }
    },

    methods: {
        ...mapMutations([
            'setCustomerDetails',
        ]),

        showModal() {
            this.modal = true
        },

        submitPayment() {
            let that = this

            let data = {}
            data.phoneNumber = this.phoneNumber
            data.customerReference = this.customerReference

            this.btnText = "Sending request ..."
            this.submitBtn = true

            api.requestPayment(data)
                .then((response) => {
                    that.loading = true
                    that.paymentReference = response.data.paymentReference

                    that.interval = setInterval(
                        () => that.checkPaymentStatus(),
                        5000
                    )
                })
                .catch((error) => {
                    that.showError(error)
                    that.clear()
                })
        },

        checkPaymentStatus() {
            let that = this

            if (that.paymentReference != null) {

                that.count += 1;

                api.checkStatus(that.paymentReference)
                    .then((response) => {
                        if (response.data == "PENDING") {
                            if (that.count > 10) {
                                clearInterval(that.interval)
                                that.paymentStatus = "Error"
                            }
                        }

                        else if (response.data == "SUCCESS") {
                            clearInterval(that.interval)
                            that.$router.push("/register/success")
                        }

                        else {
                            clearInterval(that.interval);
                            that.paymentStatus = "Error"
                            that.paymentStatusDescription = response.data
                        }
                    })
                    .catch((error) => {
                        that.showError(error)
                        that.submitBtn = false
                    })
            }
            else {
                that.paymentStatus = "Error"
                that.showError("Could not verify payment. Please try again.")
            }
        },

        clear() {
            this.paymentStatus = null            
            this.btnText = "Request Payment"
            this.submitBtn = false
            this.loading = false

            clearInterval(this.interval)
        },

        back() {
            this.$emit('previous')
        },

        onModalHidden() {
            this.modal = false
            this.clear()

            clearInterval(this.interval)
        }
    }
}
</script>