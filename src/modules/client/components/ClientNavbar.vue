<template>
  <Navbar>
    <b-nav-item>
      <router-link
        :to="{ name: 'client-profile' }"
        class="nav-link"
      >
        Perfil
      </router-link>
    </b-nav-item>

    <b-nav-item>
      <button
        @click="$store.dispatch('authModule/logout')"
        class="nav-link btn btn-link shadow-none btn-block text-left"
      >
        Cerrar Sesión
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </b-nav-item>
  </Navbar>
</template>

<script>
export default {
  components: {
    Navbar: () => import('../../shared/components/NavBar.vue')
  }
}
</script>