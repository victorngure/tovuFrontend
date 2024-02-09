import apim from './apim'

export default {
  createCustomer(data) {
    return apim().post('/api/customer/create', data)
  },

  updateCustomerResidence(data) {
    return apim().put('/api/customer/update/residence', data)
  },

  updateNextOfKin(data) {
    return apim().put('/api/customer/update/kin', data)
  },

  updateOtherDetails(data) {
    return apim().put('/api/customer/update/other', data)
  },

  upload(data) {
    return fileApim().post('/api/upload', data)
  },

  requestPayment(data) {
    return apim().post('/api/payment/request', data)
  },

  checkStatus(reference) {
    return apim().get('/api/payment/status?paymentReference=' + reference)
  },

  signin(data) {
    return apim().post('/api/auth/signin', data)
  },
  

  customers(status, page, size) {
    return apim().get('/api/customer/list?status=' + status + '&page=' + page + '&size=' + size) 
  },

  customerCount() {
    return apim().get('/api/customer/count') 
  },

  paymentCount() {
    return apim().get('/api/payment/count')
  },

  customerPayments(customerId) {
    return apim().get('/api/payment/customerPayments?customerId=' + customerId)
  },

  payments(page, size) {
    return apim().get('/api/payment/list?page=' + page + '&size=' + size) 
  }
}