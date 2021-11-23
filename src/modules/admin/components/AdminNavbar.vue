<template>
  <Navbar>
    <b-nav-item>
      <router-link
        :to="{ name: 'administrar-contenido' }"
        class="nav-link"
      >
        Administrar Contenido
      </router-link>
    </b-nav-item>
    
    <b-nav-item>
      <router-link
        :to="{ name: 'pedidos' }"
        class="nav-link"
      >
        Pedidos
      </router-link>
    </b-nav-item>

    <b-nav-item>
      <button
        @click="$store.dispatch('authModule/logout')"
        class="nav-link btn btn-link shadow-none btn-block text-left"
      >
        Cerrar Sesión
      </button>
    </b-nav-item>
  </Navbar>
</template>

<script>
// import store from '../../../store'

export default {
  components: {
    Navbar: () => import('../../shared/components/NavBar.vue')
  }
}
</script>