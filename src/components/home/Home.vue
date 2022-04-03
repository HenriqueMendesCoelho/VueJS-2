<template>
<div>
    <h1 class="centralizado">{{ title }}</h1>
    <h2>{{ status }}</h2>
    <p class="centralizado" v-show="mensagem">{{ mensagem }}</p>
    <!-- v-on pode ser escrito tmb apenas com um @ -->
    <!-- v-bind pode ser escrito tmb apenas com um : -->
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" v-if="status == 200" placeholder="Digite">
    <ul class="ul-lista">
        <li class="li-lista" v-for="foto of fotosComFiltro" :key=foto.titulo>
        <meu-painel class="painel-conteudo" :titulo="foto.titulo" :descricao="foto.descricao">
            <imagem-responsiva v-meu-transform:scale.reverse.animate="1.1" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
            <router-link :to="{name: 'altera', params: { id: foto._id }}">
                <meu-botao rotulo="Alterar" tipo="button"/>
            </router-link>
            <meu-botao rotulo="Remover" tipo="button" @botaoAtivado="remove(foto)" :confirmacao="true" estilo="alerta"/>
        </meu-painel>
        </li>
    </ul>
    </div>
</template>

<script>
    import Painel from '../shared/painel/Painel.vue';
    import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
    import Botao from '../shared/botao/Botao.vue'
    import FotoService from '../../domain/foto/FotoService'

    export default {
        components: {
            'meu-painel': Painel,
            'imagem-responsiva': ImagemResponsiva,
            'meu-botao': Botao
        },
        data () {
        return {
            title: "Exibição de fotos",
            fotos: [],
            status: null,
            filtro: "",
            mensagem: ""
        }
        },
        computed: {

            fotosComFiltro() {
                if(this.filtro){
                let exp = new RegExp(this.filtro.trim(), 'i');
                return this.fotos.filter(foto => exp.test(foto.titulo));
                }else {
                return this.fotos;
                }
            }
        },
        methods: {
            remove(foto) {
                //this.$http.delete(`v1/fotos/${foto._id}`)
                this.service.remove(foto._id)
                .then(() => {
                    let indice = this.fotos.indexOf(foto);
                    this.fotos.splice(indice, 1);
                    this.mensagem="Foto removida com sucesso!";
                }, err => this.mensagem = err.message); 
            }
        },
        created(){
            //Realizando requisição get
            this.service = new FotoService(this.$resource);
            
            this.service
                .list()
                .then( fotos => this.fotos = fotos, err => this.mensagem = err.message);

            //Uma das formas de fazer - Feito pela preira vez
            /*
            let promise = this.$http.get('v1/fotos');

            //Pegando o status da promeça caso a requisição seja executada com sucesso
            promise.then(res => this.status = res.status);

            //Pegando o json da response caso a requisição seja executada com sucesso
            promise
                .then(res => res.json())
                .then(fotos => this.fotos = fotos);
            //Informando em tela caso a promise da requisição 
            //não tenha sido executada com sucesso
            if(this.status == null || this.status == 0) this.status = "Server error";
            */
        }
    }
</script>

<style>
    .centralizado{
        text-align: center;
    }
    .ul-lista{
        list-style: none;
    }
    .ul-lista .li-lista{
        display: inline-block;
    }
    .filtro {
        display: block;
        width: 100%;
    }
</style>
