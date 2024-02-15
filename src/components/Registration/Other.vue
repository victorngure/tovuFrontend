<template>
    <div>
        <p class="text-danger">All input fields marked with * are mandatory.</p>

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

            <b-button class="px-4 float-right mt-2" variant="primary" @click="next()">Next</b-button>
        </b-card>
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
            loanTypes: ['Business Working Capital', 'Land Asset Financing', 'Motor Vehicle Asset Financing', 'School Fees Loan', 'Emergency Loan', 'Other Loan'],
        };
    },

    computed: {
        ...mapGetters(['getCustomerDetails']),
    },

    mounted() {
        if(this.getCustomerDetails == null) {
            this.showError("Customer details could not be found!")
            that.$emit('previous')
        }
    },

    methods: {
        ...mapMutations([
            'setCustomerDetails',
        ]),

        next() {
            let that = this

            let data = {}

            data.referralSource = this.selectedSource
            data.referralName = this.staffName
            data.joinReason = this.selectedReason
            data.productPreference = this.selectedLoanType
            data.customerReference = this.getCustomerDetails.customerReference

            api.updateOtherDetails(data)
                .then((response) => {   
                    that.setCustomerDetails(response.data)
                    that.$emit('next')
                    that.showSuccess("Details saved successfully!")
                })
                .catch((error) => {
                    that.showError(error)
                })
        },

        handleFileChange(e) {
            this.fileSelectLabel = e.target.files[0].name
        }
    }
}
</script>