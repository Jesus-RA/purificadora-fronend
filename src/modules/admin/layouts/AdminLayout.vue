<template>
    <div>
        <AdminNavbar />

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    components: {
        AdminNavbar: () => import('../components/AdminNavbar.vue')
    }
}
</script>