<template>
    <button @click="disparaAcao()" class="botao" :class="estiloDoBotao" :type="tipo">{{ rotulo }}</button>
</template>

<script>

export default {
    props: {
        tipo: {
            type: String,
            required: true
        },
        rotulo: {
            type: String,
            required: true
        },
        confirmacao: Boolean,
        estilo: String
    },

    methods: {
        disparaAcao(){
            if(this.confirmacao) {
                if(confirm("Confirma operação ?")){
                    this.$emit("botaoAtivado");
                }
                return;
            }
            this.$emit("botaoAtivado");
        }
    },

    computed: {
        estiloDoBotao() {
            if(this.estilo == "padrao" || !this.estilo) return 'botao-padrao';
            if(this.estilo == "alerta") return 'botao-perigo';
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