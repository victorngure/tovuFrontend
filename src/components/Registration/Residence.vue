<template>
    <div>
        <p class="text-danger">All input fields marked with * are mandatory.</p>

        <b-overlay :show="loading" rounded="sm">
            <b-card>
                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Which country do you come from?*">
                            <b-form-input type="text" placeholder="Enter name of country" v-model="country"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Which town do you come from?*">
                            <b-form-input type="text" placeholder="Enter name of town" v-model="town"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Residence Type*">
                            <b-form-select v-model="selectedResidenceType" :options="residenceTypes"></b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Estate Name">
                            <b-form-input type="text" placeholder="Enter name of estate" v-model="estate"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>                  
                    <b-col lg="6" sm="12">
                        <b-form-group label="House Number">
                            <b-form-input type="text" placeholder="Enter house number" v-model="houseNumber"></b-form-input>
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
            country: "Kenya",
            town: null,

            residenceTypes: ["Rented", "Owned"],
            selectedResidenceType: null,

            estate: null,
            houseNumber: null,

            loading: false
        };
    },

    computed: {
        ...mapGetters(['getCustomerDetails', 'getResidence']),
    },

    mounted() {
        if (this.getCustomerDetails == null) {
            this.showError("Residence details could not be found!")
            that.$emit('previous')
        }
        else {
            if(this.getResidence) {
                this.country = this.getCustomerDetails.country
                this.town = this.getCustomerDetails.residence
                this.selectedResidenceType = this.getCustomerDetails.residenceType
                this.estate = this.getCustomerDetails.estate
                this.houseNumber = this.getCustomerDetails.houseNumber
            }
        }
    },

    methods: {
        ...mapMutations([
            'setCustomerDetails', 'setResidence'
        ]),

        submit() {
            if (this.town != null &&
                this.selectedResidenceType != null) {
                this.next()
            }
            else {
                this.showError("Please fill all mandatory fields!")
            }
        },

        next() {
            let that = this

            let data = {}

            this.loading = true

            data.country = this.country 
            data.residence = this.town
            data.residenceType = this.selectedResidenceType
            data.estate = this.estate
            data.houseNumber = this.houseNumber
            data.customerReference = this.getCustomerDetails.customerReference

            api.updateCustomerResidence(data)
                .then((response) => {
                    that.loading = false

                    that.setCustomerDetails(response.data)
                    that.setResidence(true)

                    that.$emit('next')
                    that.showSuccess("Details saved successfully!")
                })
                .catch((error) => {
                    that.loading = false

                    that.showError(error)
                })
        },

        back() {
            this.$emit('previous')
        },

        handleFileChange(e) {
            this.fileSelectLabel = e.target.files[0].name
        }
    }
}
</script>