<template>
<div class="corpo">

    <h1 class="title">{{ title }}</h1>
    <h2>{{ status }}</h2>
    <!-- v-on pode ser escrito tmb apenas com um @ -->
    <!-- v-bind pode ser escrito tmb apenas com um : -->
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Digite">
    <ul class="ul-lista">
      <li class="li-lista" v-for="foto of fotosComFiltro" :key=foto>
        <meu-painel class="painel-conteudo" :titulo="foto.titulo">
            <img class="img" :src="foto.url" :alt="foto.titulo">
          </meu-painel>

      </li>
    </ul>

  </div>
</template>

<script>
  import Painel from './components/shared/painel/Painel.vue';

  export default {
    components: {
      'meu-painel': Painel
    },
    name: 'app',
    data () {
      return {
        title: "Exibição de fotos",
        fotos: [],
        status: null,
        filtro: ""
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
    created(){
      //Realizando requisição get
      let promise = this.$http.get('http://localhost:3000/v1/fotos');

      //Pegando o status da promeça caso a requisição seja executada com sucesso
      promise.then(res => this.status = res.status);

      //Pegando o json da response caso a requisição seja executada com sucesso
      promise
          .then(res => res.json())
          .then(fotos => this.fotos = fotos);
      
      //Informando em tela caso a promise da requisição 
      //não tenha sido executada com sucesso
      if(this.status == null || this.status == 0){
        this.status = "Server error";
      }
    }
  }
</script>

<style>
  .corpo{
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }
  .title{
    text-align: center;
  }
  .ul-lista{
    list-style: none;
  }
  .ul-lista .li-lista{
    display: inline-block;
  }

  .img {
    width: 100%;
  }
  .filtro {
    display: block;
    width: 100%;
  }
</style>
