<template>
    <div>
        <p class="text-danger">All input fields marked with * are mandatory.</p>

        <b-overlay :show="loading" rounded="sm">
            <b-card>
                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Customer Name*">
                            <b-form-input type="text" placeholder="Enter your full names"
                                v-model="customerName"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Trading As">
                            <b-form-input type="text" placeholder="Enter trading as" v-model="tradingAs"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Date of Birth*">
                            <b-form-input type="date" placeholder="Enter your date of birth" v-model="dob"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Sex*">
                            <b-form-select v-model="selectedSex" :options="sex"></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Phone Number*">
                            <b-form-input type="number" placeholder="Enter your phone number"
                                v-model="phoneNumber"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Email*">
                            <b-form-input type="email" placeholder="Enter your email" v-model="email"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="KRA PIN*">
                            <b-form-input type="text" placeholder="Enter your KRA pin"
                                v-model="kraPin"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Identification Document*">
                            <b-form-radio-group v-model="selectedIdentification" :options="identificationDocuments"
                                @change="changeRadio($event)"></b-form-radio-group>
                        </b-form-group>

                        <b-form-group v-if="selectedIdentification == 'National Id'">
                            <b-form-input type="number" placeholder="Enter your national id"
                                v-model="nationalId"></b-form-input>
                        </b-form-group>

                        <b-form-group v-else>
                            <b-form-input type="text" placeholder="Enter your passport number"
                                v-model="passportNumber"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Upload Copy*">
                            <div class="rounded custom-file-upload-container d-flex">
                                <label for="fileInput" id="uploadButton" class="custom-text-muted">{{ fileSelectLabel
                                }}</label>
                                <input type="file" id="fileInput" @change="handleFileChange($event)">
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row> -->

                <b-button class="px-4 float-right mt-2" variant="primary" @click="next()">Next</b-button>
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
            customerName: null,
            tradingAs: null,

            dob: null,
            sex: ["Male", "Female"],
            selectedSex: null,

            phoneNumber: null,
            email: null,

            maritalStatus: ["Single", "Married", "Other"],
            selectedMaritalStatus: null,

            selectedIdentification: 'National Id',
            identificationDocuments: ['National Id', 'Passport'],

            kraPin: null,
            nationalId: null,
            passportNumber: null,

            fileSelectLabel: "Select a File",

            loading: false

        };
    },

    methods: {
        ...mapMutations([
            'setCustomerDetails',
        ]),

        next() {
            let that = this

            this.loading = true

            let data = {}

            data.customerName = this.customerName
            data.tradingAs = this.tradingAs
            data.dob = this.dob
            data.sex = this.selectedSex
            data.phoneNumber = this.phoneNumber
            data.email = this.email
            data.maritalStatus = this.selectedMaritalStatus
            data.identificationDocument = this.selectedIdentification
            data.nationalId = this.nationalId
            data.passportNumber = this.passportNumber
            data.kraPin = this.kraPin

            api.createCustomer(data)
                .then((response) => {
                    that.setCustomerDetails(response.data)
                    that.$emit('next')
                    that.showSuccess("Details saved successfully!")

                    that.loading = false
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