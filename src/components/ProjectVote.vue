<script setup>

import { ref, onMounted, onUpdated, onBeforeUpdate } from 'vue';
import { NButton, useNotification, NIcon } from 'naive-ui'
import { AddCircleRound, LogInRound } from '@vicons/material'
import { user } from '../stateManagement/user';

const props = defineProps({ projectInfo: Object, userState: Object })
const emit = defineEmits(["updateVoteCount", "emitLoginClick"]);
let showVoteRequestFailError = ref(false);
let showVoteRequestFailSuccess = ref(false);
let showVoteRequestFailErrorMessage = ref("");
let showVoteRequestFailSuccessMessage = ref("");

let userVoted = ref(false);

onMounted(( ) => {
    checkIfUserVoted();
});

onBeforeUpdate(() => {
    checkIfUserVoted();
    
})


function checkIfUserVoted() {
    
    const userId = user.getUserData().data.id;
    const votedProjects = props.projectInfo.votoIds || [];

    for (const voto of votedProjects) {
        if (voto.usuarioId === userId) {
            userVoted.value = true;
            break;
        }
    }
}


const notification = useNotification();


function performVote(event) {
    console.log("performVote");
    sendRequest(prepareRequest());
}

function getProjectInfo() {
    return props.projectInfo;
}

function prepareRequest() {
    console.log("prepareRequest");
    //getUserInfo();
    let project = getProjectInfo();
    console.log("prepare aqui", project)
    let date = new Date().toISOString().slice(0, 10);
    let payload = {
        "projetoId": project.id, 
        "usuarioId": user.getUserData().data.id, // recebe informacoes do user logado 
        "dataCriacao": date,
        "nome": project.nome
    }
    return payload;
}

function sendRequest(payload) {
    console.log("sendRequest");
    fetch('http://localhost:8080/votos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then((response) => {
            if (response.ok) {
                response.text().then((data) => handleVoteSuccessResponse(data, payload));
                console.log("POST votos > success");
            } else {
                response.text().then((data) => handleVoteErrorResponse());
                console.log("POST votos > error");
            }
        })
}

function handleVoteSuccessResponse(data, payload) {
    showVoteRequestFailSuccessMessage.value = "Voto bem-sucedido!"
    showVoteRequestFailSuccess.value = true;
    notification.create({
        title: "Success",
        content: showVoteRequestFailSuccessMessage.value,
        type: "success",
        duration: 2e3,
        closable: false
    })
    updateVotedProject(data, payload);
    console.log("handleVoteSuccessResponse");
}

function handleVoteErrorResponse() {
    console.log("handleVoteErrorResponse");
    showVoteRequestFailErrorMessage.value = "Voto falhou: causa"
    showVoteRequestFailError.value = true;
    notification.create({
        title: "Error",
        content: showVoteRequestFailErrorMessage.value,
        type: "error",
        duration: 2e3,
        closable: false
    })
}

function updateVotedProject(data, payload) {
    console.log("updateVotedProject");
    fetch(`http://localhost:8080/projetos/${payload.projetoId}`)
        .then(res => res.json())
        .then(data => {
            emit("updateVoteCount", data)
        })
}

function emitLoginClick() {
    emit("emitLoginClick")
}
</script>

<template>
    <n-button v-show="(props.userState.isSignedIn)" @click="performVote" :disabled="showVoteRequestFailError || showVoteRequestFailSuccess || userVoted">
        <template #icon>
            <n-icon>
                <add-circle-round />
            </n-icon>
        </template>
        Votar</n-button>
        <n-button v-show="!(props.userState.isSignedIn)" @click="emitLoginClick" strong secondary type="info">
        <template #icon>
            <n-icon>
                <log-in-round />
            </n-icon>
        </template>
        Login</n-button>
    <p v-show="showVoteRequestFailError" class="red">{{ showVoteRequestFailErrorMessage }}</p>
    <p v-show="showVoteRequestFailSuccess" class="green">{{ showVoteRequestFailSuccessMessage }}</p>
</template>

<style scoped>
p {
    margin: 0;
}

.red {
    color: red;
}

.green {
    color: rgb(67, 168, 13);
}

.spacer {
    margin: 20px 0;
}</style>