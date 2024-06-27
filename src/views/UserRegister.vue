<script setup>
import { ref } from 'vue';
import { useMessage, NForm, NFormItem, NInput, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';
import NeoNavBar from '../components/NeoNavBar.vue';

const formRef = ref(null);
const message = useMessage();
const router = useRouter();

const formValue = ref({
  user: {
    nome: '',
    dataNascimento: '',
    cpf: ''
  }
});

const rules = {
  user: {
    nome: {
      required: true,
      message: 'Por favor insira seu nome.',
      trigger: 'blur'
    },
    dataNascimento: {
      required: true,
      message: 'Por favor insira sua data de nascimento.',
      trigger: ['input', 'blur']
    },
    cpf: {
      required: true,
      message: 'Por favor, insira seu número de CPF.',
      trigger: ['input', 'blur']
    }
  }
};

function handleValidateClick(e) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Validação bem-sucedida');
      registerUser();
    } else {
      console.log(errors);
      message.error('Erro na validação');
    }
  });
}

function registerUser() {
  const userData = { ...formValue.value.user, dataNascimento: formatDate(formValue.value.user.dataNascimento) };
  console.log("Enviando dados do usuário:", userData);

  fetch('http://localhost:8080/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(`Erro: ${err.message}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Resposta do servidor:", data);
      router.push("/");
    })
    .catch(error => {
      console.error('Erro:', error);
      message.error('Falha ao registrar usuário');
    });
}

function formatDate(date) {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
}
</script>

<template>
  <NeoNavBar />
  <main class="main-container">
    <div class="form-card">
      <h1 class="form-title">Registro de Usuário</h1>
      <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="left" label-width="120">
        <n-form-item label="Nome" path="user.nome">
          <n-input v-model:value="formValue.user.nome" placeholder="Digite o nome" clearable />
        </n-form-item>
        <n-form-item label="CPF" path="user.cpf">
          <n-input v-model:value="formValue.user.cpf" placeholder="Digite o CPF" clearable />
        </n-form-item>
        <n-form-item label="Data de Nascimento" path="user.dataNascimento">
          <n-input v-model:value="formValue.user.dataNascimento" placeholder="Digite a data de nascimento (dd-MM-yyyy)" clearable />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" size="large" @click="handleValidateClick">
            Cadastrar
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.form-card {
  max-width: 500px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.n-form-item {
  margin-bottom: 20px;
}

.n-input {
  width: 100%;
}

.n-input input {
  border-radius: 4px;
}

.n-input input:focus {
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.n-button {
  width: 100%;
}
</style>
