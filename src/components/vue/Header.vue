<script setup>
    import { color } from '../../stores/productsStore.js';
    import { useStore } from '@nanostores/vue';

    const $color = useStore(color);
</script>

<template>
    <header>
        <a href="/"><img src="../../../public/logo_delta_chiguire.png" alt="logo-chiguire"></a>
    </header>
</template>

<style scoped>
    header{
        @apply flex justify-center mb-10;
        background-color: v-bind($color);
    }
</style>