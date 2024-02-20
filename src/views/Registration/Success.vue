<template>
    <div class="custom-content mb-4">
        <div class="custom-wrapper p-4 mb-4">
            <TopNav class="p-2" />
            <hr />

            <div class="d-flex justify-content-center mt-4">
                <p class="text-center fw-bold mt-4">Registration Successfull</p>
            </div>

            <div class="d-flex justify-content-center">
                <img src="@/assets/img/success.png" width="80px" />
            </div>

            <div class="d-flex justify-content-center">
                <p class="text-center fw-bold mt-4">Your payment has been received successfully! Welcome to TOVU SACCO</p>                
            </div>

            <div class="d-flex justify-content-center">
                <p class="text-center">To start saving, use paybill 4117239, and use your ID number as the account number</p>
            </div>

            <div class="d-flex justify-content-center">
                <p class="text-center">
                    Thank you!
                </p>
            </div>   
            
            <div class="d-flex justify-content-center mt-4">
                <b-button class="px-4 mt-4" @click="navigate()">Go Back</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue"

export default {
    name: 'Success',
    components: {
        TopNav,
    },

    data() {
        return {

        };
    },

    methods: {
        navigate() {
            this.$router.push("/")
        }
    }
}
</script>