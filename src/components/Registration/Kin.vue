<template>
    <div>
        <p class="text-danger">All input fields marked with * are mandatory.</p>

        <b-overlay :show="loading" rounded="sm">
            <b-card>
                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Next of Kin Name*">
                            <b-form-input type="text" placeholder="Enter name of next of kin"
                                v-model="kinName"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6" sm="12">
                        <b-form-group label="Relationship*">
                            <b-form-input type="text" placeholder="Enter relationship with next of kin"
                                v-model="relationship"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group label="Phone number*">
                            <b-form-input type="text" placeholder="Enter next of kin's phone number"
                                v-model="phoneNumber"></b-form-input>
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
            kinName: null,
            relationship: null,

            phoneNumber: null,
            loading: false
        };
    },

    computed: {
        ...mapGetters(['getCustomerDetails', 'getKin']),
    },

    mounted() {
        if (this.getCustomerDetails == null) {
            this.showError("Customer details could not be found!")
            this.$emit('previous')
        }
        else {
            if (this.getKin) {
                this.kinName = this.getCustomerDetails.kinName
                this.relationship = this.getCustomerDetails.kinRelationship
                this.phoneNumber = this.getCustomerDetails.kinPhone
            }
        }
    },

    methods: {
        ...mapMutations([
            'setCustomerDetails', 'setKin'
        ]),

        submit() {
            if (this.kinName != null &&
                this.relationship != null &&
                this.phoneNumber != null) {
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

            data.kinName = this.kinName
            data.kinRelationship = this.relationship
            data.kinPhone = this.phoneNumber
            data.customerReference = this.getCustomerDetails.customerReference

            api.updateNextOfKin(data)
                .then((response) => {
                    that.loading = false

                    that.setCustomerDetails(response.data)
                    that.setKin(true)

                    that.$emit('next')
                    that.showSuccess("Details saved successfully!")
                })
                .catch((error) => {
                    that.loading = false
                    
                    that.showError(error)
                })
        }
    }
}
</script>