<template>
  <main>
    <NeoNavBar />
    <div class="container my-5">
      <n-grid cols="1">
        <n-grid-item>
          <h1 class="text-center">Criação de Projeto</h1>
          <n-form @submit.prevent="createProjeto" ref="formRef">
            <!-- Nome do Projeto -->
            <n-form-item label="Nome do Projeto" path="projeto.nome" :rule="rules.nome">
              <n-input v-model="projeto.nome" placeholder="Nome do Projeto" required />
            </n-form-item>
            
            <!-- Descrição do Projeto -->
            <n-form-item label="Descrição do Projeto" path="projeto.descricao" :rule="rules.descricao">
              <n-input type="textarea" v-model="projeto.descricao" placeholder="Descrição do Projeto" required />
            </n-form-item>
            <!-- CEP -->
            <n-form-item label="CEP" path="endereco.cep" :rule="rules.cep">
              <n-input v-model="endereco.cep" @blur="fetchEndereco" placeholder="CEP" required />
            </n-form-item>

            <!-- Rua -->
            <n-form-item label="Rua" path="endereco.rua" :rule="rules.rua">
              <n-input v-model="endereco.rua" placeholder="Rua" required />
            </n-form-item>

            <!-- Bairro -->
            <n-form-item label="Bairro" path="endereco.bairro" :rule="rules.bairro">
              <n-input v-model="endereco.bairro" placeholder="Bairro" required />
            </n-form-item>

            <!-- Município -->
            <n-form-item label="Município" path="endereco.municipio" :rule="rules.municipio">
              <n-input v-model="endereco.municipio" placeholder="Município" required />
            </n-form-item>

            <!-- Estado -->
            <n-form-item label="Estado" path="endereco.estado" :rule="rules.estado">
              <n-input v-model="endereco.estado" placeholder="Estado" required />
            </n-form-item>

            <!-- Nome do Projeto -->
            <n-form-item label="Nome do Projeto" path="projeto.nome" :rule="rules.nome">
              <n-input v-model="projeto.nome" placeholder="Nome do Projeto" required />
            </n-form-item>
            
            <!-- Descrição do Projeto -->
            <n-form-item label="Descrição do Projeto" path="projeto.descricao" :rule="rules.descricao">
              <n-input type="textarea" v-model="projeto.descricao" placeholder="Descrição do Projeto" required />
            </n-form-item>

            <!-- Botão de Submissão -->
            <n-button type="primary" class="w-100" native-type="submit">Criar Projeto</n-button>
          </n-form>
        </n-grid-item>
      </n-grid>
    </div>
  </main>
</template>



<script>
import NeoNavBar from '../components/NeoNavBar.vue';
import { user } from '../stateManagement/user';
import { defineComponent } from 'vue';
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NGrid,
  NGridItem
} from 'naive-ui';

export default defineComponent({
  name: 'CriarProjetoView',
  components: {
    NeoNavBar,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NGrid,
    NGridItem
  },
  data() {
    return {
      projeto: {
        nome: '',
        descricao: '',
        dataCriacao: new Date().toISOString().split('T')[0],
        enderecoId: null,
        usuarioId: user.getUserData().data.id
      },
      endereco: {
        rua: '',
        cep: '',
        bairro: '',
        municipio: '',
        estado: ''
      },
      errorMessage: '',
      error: false,
      rules: {
        nome: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'O nome do projeto deve ter mais de uma letra e conter apenas letras.',
          validator(rule, value) {
            return value && value.length > 1 && /^[a-zA-Z\s]+$/.test(value);
          }
        },
        descricao: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'A descrição do projeto deve ter mais de 10 caracteres.',
          validator(rule, value) {
            return value && value.length > 10;
          }
        },
        rua: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'A rua deve ter mais de uma letra.',
          validator(rule, value) {
            return value && value.length > 1;
          }
        },
        cep: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'O CEP deve estar no formato 00000-000.',
          validator(rule, value) {
            return value && /^\d{5}-\d{3}$/.test(value);
          }
        },
        bairro: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'O bairro deve ter mais de uma letra.',
          validator(rule, value) {
            return value && value.length > 1;
          }
        },
        municipio: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'O município deve ter mais de uma letra.',
          validator(rule, value) {
            return value && value.length > 1;
          }
        },
        estado: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'O estado deve ter mais de uma letra.',
          validator(rule, value) {
            return value && value.length > 1;
          }
        }
      }
    };
  },
  methods: {
    validateForm() {
      const formRef = this.$refs.formRef;
      return new Promise((resolve) => {
        formRef.validate((errors) => {
          if (errors) {
            this.errorMessage = errors[0].message;
            this.error = true;
            alert(this.errorMessage);
            resolve(false);
          } else {
            alert('Formulário válido!');
            resolve(true);
          }
        });
      });
    },
    async fetchEndereco() {
      const cep = this.endereco.cep;
      console.log('CEP inserido:', cep);

      const cepFormatado = cep.replace(/\D/g, ''); // Remove qualquer caractere não numérico
      console.log('CEP formatado:', cepFormatado);

      if (!cepFormatado || cepFormatado.length !== 8) {
        alert('CEP inválido. O formato deve ser 00000-000.');
        return;
      }

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
        if (!response.ok) {
          throw new Error('Erro ao buscar o endereço.');
        }

        const data = await response.json();
        if (data.erro) {
          throw new Error('CEP não encontrado.');
        }

        console.log('Dados recebidos do ViaCEP:', data);
        this.endereco.rua = data.logradouro;
        this.endereco.bairro = data.bairro;
        this.endereco.municipio = data.localidade;
        this.endereco.estado = data.uf;
      } catch (error) {
        alert(error.message);
        console.error('Erro ao buscar o endereço:', error);
      }
    },
    async createProjeto() {
      const isValid = await this.validateForm();
      if (!isValid) {
        this.error = false;
        return;
      }
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

          // Em seguida, criar o projeto com o enderecoId
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
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Erro ao criar o projeto:', error);
        });
    }
  }
});
</script>


<style scoped>
/* Adicione qualquer estilo específico para esta view aqui */
</style>
