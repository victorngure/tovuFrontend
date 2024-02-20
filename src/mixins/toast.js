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
                    let errorCode = error.response.status   

                    if(errorCode == 401) {
                        content = "Your session has expired. Please login."
                    }
                    else if(errorCode == 404) {
                        content = "There was an error with your request. Please try again"
                    } 
                    else {
                        content = "Server error. Please try again later"
                    }
                }
            }
            

            this.$toasted.error(content, {
                duration: 5000,
                position: 'top-center'
            })
        }
    }
}