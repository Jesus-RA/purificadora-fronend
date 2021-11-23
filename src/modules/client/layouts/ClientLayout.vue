<template>
    <div>
        <ClientNavbar />
        
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    components: {
        ClientNavbar: () => import('../components/ClientNavbar.vue')
    }
}
</script>