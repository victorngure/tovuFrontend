<template>
    <div class="custom-content mb-4">
        <div class="custom-wrapper p-4 mb-4">
            <TopNav class="p-2" />
            <hr />

            <div>
                <b-card class="custom-auth-card custom-max-width-40">
                    <h5 class="text-center">Sign in to your account</h5>

                    <b-form-group label="Email">
                        <b-form-input type="text" v-model="email" placeholder="Enter your email"></b-form-input>
                    </b-form-group>

                    <b-form-group label="Password">
                        <b-form-input type="password" v-model="password" placeholder="Enter your password"></b-form-input>
                    </b-form-group>

                    <div class="px-8 mt-4">
                        <b-button variant="primary" class="btn-block" @click="submit()" :disabled="submitBtn">Sign
                            In</b-button>
                        <p class="text-decoration-underline text-center">Forgot Password?</p>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>
  
<script>
import api from "@/apis/api"
import TopNav from "@/components/TopNav.vue"
import { mapMutations, mapGetters } from 'vuex'

export default {
    name: 'Login',
    components: {
        TopNav,
    },

    data() {
        return {
            email: null,
            password: null,
            submitBtn: false,
        };
    },

    created() {
        this.clearData()
    },

    methods: {
        ...mapMutations([
            'setLoggedinUser',
            'setAuthenticationStatus'
        ]),

        submit() {
            let that = this

            let data = {}
            data.username = this.email
            data.password = this.password

            this.submitBtn = true

            api.signin(data)
                .then((response) => {
                    console.log(response)
                    that.submitBtn = false

                    that.setLoggedinUser(response.data)
                    that.setAuthenticationStatus("true")

                    window.localStorage.setItem("authenticated", "true")
                    window.localStorage.setItem("user", JSON.stringify(response.data))

                    that.$router.push("dashboard")
                })
                .catch((error) => {
                    if (error.response) {
                        let errorCode = error.response.status
                        that.submitBtn = false

                        if (errorCode == 401) {
                            that.showError("The credentials you provided are incorrect. Please try again")
                        }
                        else {
                            that.showError("An error occured during login.")
                        }
                    }
                })
        },

        clearData() {
            window.localStorage.clear()

            this.setLoggedinUser(null)
            this.setAuthenticationStatus(null)
        },
    }
}
</script>
  