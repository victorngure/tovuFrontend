<template>
    <div>
        <p class="text-danger">All input fields marked with * are mandatory.</p>

        <b-card>
            <b-row>
                <b-col lg="6" sm="12">
                    <b-form-group label="Next of Kin Name*">
                        <b-form-input type="text" placeholder="Enter name of next of kin" v-model="kinName"></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col lg="6" sm="12">
                    <b-form-group label="Relationship*">
                        <b-form-input type="text" placeholder="Enter name of next of kin" v-model="relationship"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col lg="6" sm="12">
                    <b-form-group label="Phone number*">
                        <b-form-input type="text" placeholder="Enter next of kin's phone number" v-model="phoneNumber"></b-form-input>
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
            kinName: "Test Kin",
            relationship: "Father",

            phoneNumber: "0701969007",

            selectedIdentification: 'National Id',
            identificationDocuments: ['National Id', 'Passport'],

            nationalId: "123",
            passportNumber: null,
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

            data.kinName = this.kinName
            data.kinRelationship = this.relationship
            data.kinIdentificationDocument = this.selectedIdentification
            data.kinNationalId = this.nationalId
            data.kinPassport = this.passportNumber
            data.kinPhone = this.phoneNumber
            data.customerReference = this.getCustomerDetails.customerReference

            api.updateNextOfKin(data)
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