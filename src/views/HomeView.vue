<template>
    <div class="custom-content mb-4">
        <div class="custom-wrapper p-4 mb-4">
            <TopNav class="p-2" />
            
            <div class="d-flex justify-content-center mt-4">
                <h6 class="text-muted text-center custom-max-width-60">
                    Welcome to Tovu Sacco. Secure your financial future with us today.
                    Please provide us with the information below to start your journey with Tovu Sacco.
                </h6>
            </div>

            <div class="d-flex justify-content-center mt-4">
                <b-button class="px-4 mt-4" variant="primary" @click="register()">Register Now</b-button>
            </div>
            
        </div>
    </div>
</template>
  
<script>
import TopNav from "@/components/TopNav.vue"

export default {
    name: 'Home',
    components: {
        TopNav,
    },

    computed: {

    },

    data() {
        return {
        };
    },

    mounted() {

    },

    methods: {
        register() {
            this.$router.push("/register")
        }
    }
}
</script>
  