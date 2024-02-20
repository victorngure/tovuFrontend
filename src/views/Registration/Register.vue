<template>
    <div class="custom-content mb-4">
        <div class="custom-wrapper p-4 mb-4">
            <TopNav class="p-2" />
            <hr />

            <div>
                <div class="d-flex justify-content-center mt-4">
                    <h6 class="text-muted text-center custom-max-width-60">
                        Welcome to Tovu Sacco. Secure your financial future with us today.
                        Please provide us with the information below to start your journey with Tovu Sacco.
                    </h6>
                </div>


                <div class="custom-bg-gray rounded p-4 mt-4">
                    <div class="d-flex justify-content-between">
                        <template v-if="step == 1">
                            <h5>Step One</h5>
                            <h5 class="text-muted">Personal Details</h5>
                        </template>

                        <template v-else-if="step == 2">
                            <h5>Step Two</h5>
                            <h5 class="text-muted">Residence</h5>
                        </template>

                        <template v-else-if="step == 3">
                            <h5>Step Three</h5>
                            <h5 class="text-muted">Next of Kin</h5>
                        </template>

                        <template v-else-if="step == 4">
                            <h5>Step Four</h5>
                            <h5 class="text-muted">Other Details</h5>
                        </template>

                        <template v-else-if="step == 5">
                            <h5>Step Five</h5>
                            <h5 class="text-muted">Payment</h5>
                        </template>
                        
                    </div>
                    <b-progress :value="step" max="6" class="my-2" variant="secondary"></b-progress>
                </div>

                <div class="mt-4">
                    <PersonalDetails v-on:next="next()" v-if="step == 1"></PersonalDetails>

                    <Residence v-on:next="next()" v-on:previous="previous()" v-if="step == 2"></Residence>

                    <Kin v-on:next="next()" v-on:previous="previous()" v-if="step == 3"></Kin>

                    <Other v-on:next="next()" v-on:previous="previous()" v-if="step == 4"></Other>

                    <Payment v-on:next="next()" v-on:previous="previous()" v-if="step == 5"></Payment>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import api from "@/apis/api"
import TopNav from "@/components/TopNav.vue"
import PersonalDetails from "@/components/Registration/PersonalDetails.vue"
import Residence from "@/components/Registration/Residence.vue"
import Kin from "@/components/Registration/Kin.vue"
import Other from "@/components/Registration/Other.vue"
import Payment from "@/components/Registration/Payment.vue"

export default {
    name: 'Home',
    components: {
        TopNav,
        PersonalDetails,
        Residence,
        Kin,
        Other,
        Payment
    },

    computed: {

    },

    data() {
        return {
            step: 1
        };
    },

    mounted() {

    },

    methods: {
        next() {            
            this.step += 1
        },

        previous() {
            if(this.step > 1) {
                this.step --
            }
        }
    }
}
</script>
  