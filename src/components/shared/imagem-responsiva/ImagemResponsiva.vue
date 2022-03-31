<template>
    <img class="imagem-res" :src="url" :alt="titulo">
</template>

<script>

export default {

    props: ['url', 'titulo'],
}
</script>

<style scoped>
    .imagem-res {
        width: 100%;
    }
</style>
