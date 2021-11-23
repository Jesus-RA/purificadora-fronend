<template>        
    <div
        class="spinner-border"
        :class="`text-${ color }`"
        role="status"
    >
        <span class="visually-hidden"></span>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'info'
        }
    }
}
</script>