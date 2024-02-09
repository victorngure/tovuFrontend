<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
  @import '@/assets/css/style.css';
  @import '@/assets/css/responsive.css';
  @import 'https://unpkg.com/bootstrap-vue@2.16.0/dist/bootstrap-vue.css';
  @import 'https://unpkg.com/bootstrap@4.5.2/dist/css/bootstrap.min.css';
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
import api from "@/apis/api"

export default {
    name: 'App',

    data() {
        return {
          //
        };
    },

    computed: {
      //
    },

    created() {
      
    },

    methods: {
      
    }
}
</script>