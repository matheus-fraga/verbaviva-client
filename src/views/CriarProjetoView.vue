<template>
  <main>
    <Navbar />
    <div class="container my-5">
      <div class="row">
        <div class="col-md-12">
          <h1 class="text-center">Criação de Projeto</h1>
          <form @submit.prevent="createProjeto">
            <!-- Nome do Projeto -->
            <div class="form-group mb-3">
              <label for="nomeProjeto" class="form-label">Nome do Projeto</label>
              <input type="text" class="form-control" id="nomeProjeto" placeholder="Nome do Projeto" v-model="projeto.nome" required>
            </div>
            
            <!-- Descrição do Projeto -->
            <div class="form-group mb-3">
              <label for="descricaoProjeto" class="form-label">Descrição do Projeto</label>
              <textarea class="form-control" id="descricaoProjeto" placeholder="Descrição do Projeto" v-model="projeto.descricao" required></textarea>
            </div>
            
            <!-- Rua -->
            <div class="form-group mb-3">
              <label for="rua" class="form-label">Rua</label>
              <input type="text" class="form-control" id="rua" placeholder="Rua" v-model="endereco.rua" required>
            </div>

            <!-- CEP -->
            <div class="form-group mb-3">
              <label for="cep" class="form-label">CEP</label>
              <input type="text" class="form-control" id="cep" placeholder="CEP" v-model="endereco.cep" required>
            </div>

            <!-- Bairro -->
            <div class="form-group mb-3">
              <label for="bairro" class="form-label">Bairro</label>
              <input type="text" class="form-control" id="bairro" placeholder="Bairro" v-model="endereco.bairro" required>
            </div>

            <!-- Município -->
            <div class="form-group mb-3">
              <label for="municipio" class="form-label">Município</label>
              <input type="text" class="form-control" id="municipio" placeholder="Município" v-model="endereco.municipio" required>
            </div>

            <!-- Estado -->
            <div class="form-group mb-3">
              <label for="estado" class="form-label">Estado</label>
              <input type="text" class="form-control" id="estado" placeholder="Estado" v-model="endereco.estado" required>
            </div>

<!--           
            <div class="form-group mb-3">
              <label for="coordenadaX" class="form-label">Coordenada X</label>
              <input type="text" class="form-control" id="coordenadaX" placeholder="Coordenada X" v-model="endereco.coordenadaX" required>
            </div>

           
            <div class="form-group mb-3">
              <label for="coordenadaY" class="form-label">Coordenada Y</label>
              <input type="text" class="form-control" id="coordenadaY" placeholder="Coordenada Y" v-model="endereco.coordenadaY" required>
            </div> -->
            
            <!-- Botão de Submissão -->
            <button type="submit" class="btn btn-primary w-100">Criar Projeto</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { user } from '../stateManagement/user';

export default {
  name: 'CriarProjetoView',
  components: {
    Navbar
  },
  data() {
    return {
      projeto: {
        nome: '',
        descricao: '',
        dataCriacao: new Date().toISOString().split('T')[0], // Data atual
        enderecoId: null,
        usuarioId:  user.getUserData().data.id
      },
      endereco: {
        rua: '',
        cep: '',
        bairro: '',
        municipio: '',
        estado: '',
        // coordenadaX: '',
        // coordenadaY: ''
      }
    }
  },
  methods: {
    createProjeto() {
      // Primeiro, criar o endereço
      fetch('http://localhost:8080/enderecos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.endereco)
      })
      .then(response => response.json())
      .then(enderecoData => {
        console.log('Endereço criado:', enderecoData);
        this.projeto.enderecoId = enderecoData.id;

        // Em seguida, criar o projeto com o endereçoId
        return fetch('http://localhost:8080/projetos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.projeto)
        });
      })
      .then(response => response.json())
      .then(projetoData => {
        console.log('Projeto criado:', projetoData);
        this.$router.push("/");
      })
      .catch(error => {
        console.error("Erro ao criar o projeto:", error);
      });
    }
  }
}
</script>

<style scoped>
/* Adicione qualquer estilo específico para esta view aqui */
</style>
