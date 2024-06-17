<script setup>
import { NButton, NCard, NSpace, NSwitch, NTag, NInput, NDatePicker, NDivider } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { user } from "../stateManagement/user.js";
const emit = defineEmits(["emitLoginComponentClose", "updateLoginInfo"]);



let dividerTextPlacement = ref("center");

let showLogoutButton = ref(user.getUserData().isSignedIn);
let showLoginButton = ref(!showLogoutButton.value);''
const cpf = ref('');
const dataNascimento = ref(null);

onMounted (()=>{
    setStuffBasedOnScreenSize();
})

function setStuffBasedOnScreenSize() {
    let width = window.innerWidth;
  if (width <= 900) {
    dividerTextPlacement.value = "center";
  } else {
    dividerTextPlacement.value = "left";
  }
}
function emitLoginComponentClose() {
    emit("emitLoginComponentClose")
}

function fazLogin() {
  console.log(cpf.value)
  console.log(dataNascimento.value)



    if (!cpf.value || !dataNascimento.value) {
        console.log("CPF e data de nascimento são obrigatórios");
    }

    const formulario = {
        cpf: cpf.value,
        dataNascimento: timestampToDate(dataNascimento.value)
    };

    fetch('http://localhost:8080/usuarios/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario)
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.authenticated) {
            console.log("usuário localizado");
            user.signIn(data);
            showLogoutButton.value = true;
            showLoginButton.value = false;
            emit('updateLoginInfo') 
        } else {
            console.log("usuário não localizado");
        }
    })
    .catch(error => {
        console.log("Erro na autenticação: ", error);
    });
}

 function fazLogout(){
  user.signOut();
  showLoginButton.value = true;
  showLogoutButton.value = false;
  emit('updateLoginInfo');
}

function timestampToDate(timestamp) {
    // Create a new Date object with the given timestamp
    const date = new Date(timestamp);

    // Extract the year, month, and day from the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

</script>

<template>
    <div>
      <n-card title="Login" hoverable closable size="small" @close="emitLoginComponentClose">
        <n-space vertical>
          <n-input v-model:value="cpf" size="tiny" placeholder="CPF" />
          <n-date-picker v-model:value="dataNascimento" size="tiny" type="date" />
          <n-space>
            <n-button v-show="showLoginButton" size="tiny" type="primary" @click="fazLogin">Login</n-button>
            <n-button v-show="showLogoutButton" size="tiny" type="secondary" @click="fazLogout">Logout</n-button>
          </n-space>
        </n-space>
      </n-card>
    </div>
  </template>