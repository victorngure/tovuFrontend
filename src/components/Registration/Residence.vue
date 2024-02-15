<template>
    <div>
        <p class="text-danger">All input fields marked with * are mandatory.</p>

        <b-card>
            <b-row>
                <b-col lg="6" sm="12">
                    <b-form-group label="Which town do you come from?*">
                        <b-form-input type="text" placeholder="Enter name of town" v-model="town"></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col lg="6" sm="12">
                    <b-form-group label="Residence Type*">
                        <b-form-select v-model="selectedResidenceType" :options="residenceTypes"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col lg="6" sm="12">
                    <b-form-group label="Estate Name">
                        <b-form-input type="text" placeholder="Enter name of estate" v-model="estate"></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col lg="6" sm="12">
                    <b-form-group label="House Number">
                        <b-form-input type="text" placeholder="Enter house number" v-model="houseNumber"></b-form-input>
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
            town: null,

            residenceTypes: ["Rented", "Owned"],
            selectedResidenceType: null,

            estate: null,
            houseNumber: null,
        };
    },

    computed: {
        ...mapGetters(['getCustomerDetails']),
    },

    mounted() {
        if(this.getCustomerDetails == null) {
            this.showError("Personal details could not be found!")
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

            data.residence = this.town
            data.residenceType = this.selectedResidenceType
            data.estate = this.estate
            data.houseNumber = this.houseNumber
            data.customerReference = this.getCustomerDetails.customerReference

            api.updateCustomerResidence(data)
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