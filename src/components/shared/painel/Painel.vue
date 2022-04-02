<template>
    <div class="painel">
        <!-- v-on pode ser escrito tmb apenas com um @ -->
        <h2 class="painel-titulo" @click="visible = !visible">{{ titulo }}</h2>
        <transition name="painel-fade">
            <div class="painel-conteudo" v-show="visible">
                <slot></slot>
                <h2 class="painel-desc" v-show="descricao">{{ descricao }}</h2>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: ['titulo', 'descricao'],

        data() {
            return {
                visible : true
            }
        }
    }
</script>

<style scoped>
    .painel {
        border: solid 1px whitesmoke;
        padding: 0 auto;
        margin: 5px;
        vertical-align: top;
        text-align: center;
        width: 200px;
        height: 100%;
        display: inline-block;
        background-color: rgb(21, 55, 118);
    }
    .painel-titulo {
        text-align: center;
        text-align-last: center;
        vertical-align: top;
        height: 45px;
        font-size: 20px;
        border-block-end: solid 1px whitesmoke;
    }
    .painel-desc {
        text-align: center;
        text-align-last: center;
        vertical-align: top;
        font-size: 10px;
    }
    .painel-conteudo {
        overflow: hidden;
    }

    .painel-fade-enter, .painel-fade-leave-active {
        opacity: 0;
    }

    .painel-fade-enter-active, .painel-fade-leave-active{
        transition: opacity .3s;
    }
</style>
