<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" class="px-4">
            <b-navbar-brand href="#" >Tovu Sacco Admin</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#" @click="navigate('dashboard')" :active="currentPage == 'Dashboard'">Dashboard</b-nav-item>
                    <b-nav-item href="#" @click="navigate('payments')" :active="currentPage == 'Payments'">Payments</b-nav-item>
                    <b-nav-item href="#" @click="navigate('customers')" :active="currentPage == 'Customers'">Customers</b-nav-item>
                    <b-nav-item href="#" @click="navigate('leads')" :active="currentPage == 'Leads'">Leads</b-nav-item>
                    <b-nav-item href="#" @click="navigate('login')" :active="currentPage == 'Logout'">Logout</b-nav-item>
                    
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: null,
            }
        },

        props: {
            page: String
        },

        mounted() {
            this.currentPage = this.page
        },

        methods: {
            navigate(path) {
                this.$router.push(path)
            }
        }
    }
</script>