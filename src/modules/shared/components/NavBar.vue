<template>
  <b-navbar toggleable="lg" type="light" variant="transparent" :fixed="fixedPosition">
  <!-- <b-navbar toggleable="lg" type="light" variant="transparent" :sticky="sticky"> -->
    <b-navbar-brand :to="{ name: 'home' }">
      <img :src="logo" alt="">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <slot></slot>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import logo from '@/assets/logo.png'
export default {
  data(){
    return {
      logo,
      sticky: null,
      fixedPosition: null,
    }
  },
  watch: {
    '$route'(to){
      this.sticky = to.name === 'home'
      this.fixedPosition = this.$route.name === 'home' ? 'top' : ''
    }
  },
  created(){
    this.sticky = this.$router.history.current.name === 'home'
    this.fixedPosition = this.$route.name === 'home' ? 'top' : ''
  }
}
</script>

<style scoped>
  img{
    max-height: auto;
    max-width: 7rem;
  }  

  .ml-auto{
    color: #000000 !important;
  }
</style>