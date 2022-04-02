<template>
    <div>
        <h1 class="centralizado">Cadastro</h1>
        <h2 class="centralizado"></h2>

        <form @submit.prevent="salvar()">
            <div class="controle">
                <label for="titulo">TÍTULO</label>
                <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo"/>
            </div>
            <div class="controle">
                <label for="url">URL</label>
                <input id="url" autocomplete="off" v-model.lazy="foto.url"/>
                <imagem-responsiva />
            </div>
            <div class="controle">
                <label for="descricao">DESCRIÇÃO</label>
                <textarea id="descricao" autocomplete="off" v-model.lazy="foto.descricao"></textarea>
            </div>
            <div>
                <div class="centralizado">
                    <meu-painel v-show="foto.url && foto.titulo" :titulo="foto.titulo">
                        <imagem-responsiva v-meu-transform:scale.reverse.animate="1.1" v-show="foto.url && foto.titulo" :titulo="foto.titulo" :url="foto.url" />
                        <h5 class="image-sample-desc" v-show="foto.url && foto.titulo && foto.descricao">{{ foto.descricao }}</h5>
                    </meu-painel>
                </div>

            </div>
            <div class="centralizado">
                <meu-botao rotulo="SALVAR" tipo="submit" />
                <router-link :to="{name:'home'}">
                    <meu-botao rotulo="VOLTAR" tipo="button"/>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Painel from "../shared/painel/Painel.vue"
import Foto from "../../domain/foto/Foto"
import FotoService from '../../domain/foto/FotoService'

export default {
    components: {
        "imagem-responsiva": ImagemResponsiva,
        "meu-botao": Botao,
        "meu-painel": Painel
    },

    data() {
        return {
            foto: new Foto(),
            id: this.$route.params.id
        }
    },

    methods: {
        salvar () {
            this.service
                .register(this.foto)
                .then(() => {
                    if(this.id) this.$router.push({ name: "home" });
                    this.foto = new Foto();
                }, err => console.log(err));

            /*
            this.$http.post("v1/fotos", this.foto)
            .then(() => this.foto = new Foto(), err => console.log(err));
            */
        }
    },

    created() {
        this.service = new FotoService(this.$resource);

        if(this.id) 
            this.service.search(this.id)
            .then(foto => this.foto = foto);
    }
};
</script>
<style scoped>
.centralizado {
    text-align: center;
}
.controle {
    font-size: 1.2em;
    margin-bottom: 20px;
}
.controle label {
    display: block;
    font-weight: bold;
}
.image-sample {
    width: 200px;
    height: 100%;
}

.image-sample-titulo, .image-sample-desc {
    text-align: center;
}
.controle label + input,
.controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px;
}

.centralizado {
    text-align: center;
}
</style>