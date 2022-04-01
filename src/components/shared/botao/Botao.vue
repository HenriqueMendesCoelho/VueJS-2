<template>
    <button class="botao botao-perigo" :type="tipo">{{ rotulo }}</button>
</template>

<script>
export default {
    props: {
        tipo: {
            type: String,
            require: true
        },
        rotulo: {
            type: String,
            require: true
        }
    }
}
</script>

<style scoped>
    .botao {
        display: inline-block;
        padding: 5px;
        margin: 10px;
        border-radius: 1px;
        font-size: 0.8em;
    }
    .botao-perigo {
        background: firebrick;
        color: white;
    }

    .botao-padrao {
        background: darkcyan;
        color: white;
    }
</style>