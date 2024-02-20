<template>
    <div>
        <p class="text-danger">All input fields marked with * are mandatory.</p>

        <b-overlay :show="loading" rounded="sm">
            <b-card>
                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="How did you know about Tovu Sacco?*">
                            <b-form-select v-model="selectedSource" :options="referralSources"></b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12" v-if="selectedSource == 'Tovu Sacco Staff'">
                        <b-form-group label="Staff Name*">
                            <b-form-input type="text" placeholder="Enter name of staff" v-model="staffName"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Why do you want to Join Tovu Sacco?*">
                            <b-form-select v-model="selectedReason" :options="reasons"></b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12" v-if="selectedReason == 'Save to get a Loan'">
                        <b-form-group label="Which type of Loan?*">
                            <b-form-select v-model="selectedLoanType" :options="loanTypes"></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-button-group class="float-right" size="sm">
                    <b-button class="px-2 mt-2 mr-1" @click="back()">Back</b-button>
                    <b-button class="px-4 mt-2" variant="primary" @click="submit()">Next</b-button>
                </b-button-group>
            </b-card>
        </b-overlay>

    </div>
</template>

<script>
import api from "@/apis/api"
import { mapMutations, mapGetters } from 'vuex'

export default {
    data() {
        return {
            selectedSource: null,
            referralSources: ['Social Media', 'A Friend', 'Tovu Sacco Staff'],
            staffName: null,

            selectedReason: null,
            reasons: ['Save Only', 'Save to get a Loan'],

            selectedLoanType: null,
            loanTypes: ['Business Working Capital', 'Land Asset Financing', 'Motor Vehicle Asset Financing', 'Kumi Kumi Loan', 'Salary Advance', 'Benevolent Last Expense Insurance', 'Other Loan'],

            loading: false
        };
    },

    computed: {
        ...mapGetters(['getCustomerDetails', 'getOtherDetails']),
    },

    mounted() {
        if (this.getCustomerDetails == null) {
            this.showError("Customer details could not be found!")
            that.$emit('previous')
        }
        else {
            if (this.getOtherDetails) {
                this.selectedSource = this.getCustomerDetails.referralSource
                this.staffName = this.getCustomerDetails.referralName
                this.selectedReason = this.getCustomerDetails.joinReason
                this.selectedLoanType = this.getCustomerDetails.productPreference   
            }
        }
    },

    methods: {
        ...mapMutations([
            'setCustomerDetails', 'setOtherDetails'
        ]),

        submit() {
            if (this.selectedSource != null &&
                this.selectedReason != null) {
                this.next()
            }
            else {
                this.showError("Please fill all mandatory fields!")
            }
        },

        back() {
            this.$emit('previous')
        },

        next() {
            let that = this

            let data = {}

            this.loading = true

            data.referralSource = this.selectedSource
            data.referralName = this.staffName
            data.joinReason = this.selectedReason
            data.productPreference = this.selectedLoanType
            data.customerReference = this.getCustomerDetails.customerReference

            api.updateOtherDetails(data)
                .then((response) => {
                    that.loading = false

                    that.setCustomerDetails(response.data)
                    that.setOtherDetails(true)

                    that.$emit('next')
                    that.showSuccess("Details saved successfully!")
                })
                .catch((error) => {
                    that.loading = false

                    that.showError(error)
                })
        },

        handleFileChange(e) {
            this.fileSelectLabel = e.target.files[0].name
        }
    }
}
</script>