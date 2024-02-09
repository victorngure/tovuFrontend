export default {
    methods: {
        showSuccess(content) {
            this.$toasted.success(content, {
                duration: 5000,
                position: 'top-center'
            })
        },

        showError(error) {
            let content = ""

            if (typeof error === "string") {
                content = error
            }
            else {
                if (error.response) {
                    content = error.response.data
                } 
                else if (error.request) {
                    content = 'No response received from the server.'
                } 
                else {
                    content = 'An error occurred while making the request.'
                }
            }
            

            this.$toasted.error(content, {
                duration: 5000,
                position: 'top-center'
            })
        }
    }
}