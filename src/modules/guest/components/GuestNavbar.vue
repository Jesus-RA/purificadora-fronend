<template>
  <Navbar>
    <b-nav-item>
      <router-link
        :to="{ name: 'home' }"
        class="nav-link"
      >
        Inicio
      </router-link>
    </b-nav-item>

    <b-nav-item>
      <router-link to="/#about" class="nav-link">
        Sobre nosotros
      </router-link>
    </b-nav-item>

    <b-nav-item>
      <router-link to="/#contact" class="nav-link">
        Contacto
      </router-link>
    </b-nav-item>
    
    <b-nav-item>
      <router-link
        :to="{ name: 'login' }"
        class="nav-link"
      >
        Login
      </router-link>
    </b-nav-item>

    <b-nav-item>
      <router-link
        :to="{ name: 'register' }"
        class="nav-link"
      >
        Register
      </router-link>
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