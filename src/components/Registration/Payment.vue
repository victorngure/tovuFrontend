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
                <b-button class="px-4" variant="primary" @click="showModal()">Pay Now</b-button>
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

                        <small class="text-muted text-center mt-2">
                            By clicking proceeding with payment, you agree to our terms and conditions.
                        </small>

                        <b-button class="mt-4" variant="primary" :disabled="submitBtn" @click="submitPayment()">{{ btnText
                        }}</b-button>
                    </div>
                </b-overlay>
            </template>

            <template v-else-if="paymentStatus == 'Success'">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/img/success.png" width="80px"/>                    
                </div>

                <p class="text-center text-muted mt-4">Your payment has been received successfully!</p>
            </template>

            <template v-else-if="paymentStatus == 'Error'">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/img/error.png" width="80px"/>                    
                </div>

                <p class="text-center text-muted mt-4">
                    There has been an error with your payment.
                    {{ paymentStatusDescription }}
                </p>

                <div class="d-flex justify-content-center">
                    <b-button variant="secondary" @click="retryPayment()">Retry Payment</b-button>                
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
            paymentStatusDescription: null
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
                    that.submitBtn = false
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
                            that.paymentStatus = "Success"
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

        retryPayment() {
            this.paymentStatus = null
            this.loading = false
        },

        onModalHidden() {
            this.modal = false
            this.paymentStatus = null
            clearInterval(this.interval) 
        }
    }
}
</script>