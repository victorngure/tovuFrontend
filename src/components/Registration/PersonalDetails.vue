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
                            <b-form-input type="date" :max="maxDate" placeholder="Enter your date of birth"
                                v-model="dob"></b-form-input>
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
                        <b-form-group class="mb-1" label="Phone Number*">
                            <b-input-group prepend="+254" class="mt-3">
                                <b-form-input type="number" placeholder="Enter your phone number" v-model="phoneNumber"></b-form-input>
                            </b-input-group>
                        </b-form-group>

                        <div class="mb-4" >
                            <small class="text-danger" v-if="phoneError">**Phone number format should be 712345678</small>
                        </div>
                        
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Email">
                            <b-form-input type="email" placeholder="Enter your email" v-model="email"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="KRA PIN">
                            <b-form-input type="text" placeholder="Enter your KRA pin" v-model="kraPin"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Marital Status">
                            <b-form-select v-model="selectedMaritalStatus" :options="maritalStatus"></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Occupation">
                            <b-form-input type="text" placeholder="Enter your occupation" v-model="occupation"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Identification Document*">
                            <b-form-radio-group v-model="selectedIdentification"
                                :options="identificationDocuments"></b-form-radio-group>
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

                <b-button-group class="float-right" size="sm">
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
            customerName: null,
            tradingAs: null,

            dob: null,
            maxDate: new Date().toISOString().split('T')[0],
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
            occupation: null,

            fileSelectLabel: "Select a File",

            loading: false,
            phoneError: false,

        };
    },

    computed: {
        ...mapGetters(['getCustomerDetails', 'getPersonalDetails']),
    },

    mounted() {
        if (this.getPersonalDetails) {
            this.customerName = this.getCustomerDetails.customerName
            this.tradingAs = this.getCustomerDetails.tradingAs
            this.dob = this.getCustomerDetails.dob
            this.selectedSex = this.getCustomerDetails.sex
            this.phoneNumber = this.getCustomerDetails.phoneNumber.substring(3)
            this.email = this.getCustomerDetails.email
            this.selectedMaritalStatus = this.getCustomerDetails.maritalStatus
            this.selectedIdentification = this.getCustomerDetails.identificationDocument
            this.nationalId = this.getCustomerDetails.nationalId
            this.passportNumber = this.getCustomerDetails.passportNumber
            this.kraPin = this.getCustomerDetails.kraPin
            this.occupation = this.getCustomerDetails.occupation
        }
    },

    methods: {
        ...mapMutations([
            'setCustomerDetails', 'setPersonalDetails',
        ]),

        submit() {
            if (this.customerName != null &&
                this.dob != null &&
                this.selectedSex != null &&
                this.phoneNumber != null &&
                (this.nationalId != null || this.passportNumber != null)) {
                    
                if (this.phoneNumber.length !== 9) {
                    
                    this.phoneError = true
                    this.showError("Invalid phone number format")
                }
                else {
                    this.next()
                }
            }
            else {
                this.showError("Please fill all mandatory fields!")
            }
        },

        next() {
            let that = this

            this.loading = true

            let data = {}

            data.customerName = this.customerName
            data.tradingAs = this.tradingAs
            data.dob = this.dob
            data.sex = this.selectedSex
            data.phoneNumber = "254" + this.phoneNumber
            data.email = this.email
            data.maritalStatus = this.selectedMaritalStatus
            data.identificationDocument = this.selectedIdentification
            data.nationalId = this.nationalId
            data.passportNumber = this.passportNumber
            data.kraPin = this.kraPin
            data.occupation = this.occupation   

            api.createCustomer(data)
                .then((response) => {
                    that.setCustomerDetails(response.data)
                    that.setPersonalDetails(true)

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