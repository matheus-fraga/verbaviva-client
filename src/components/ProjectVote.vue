<script setup>
    //Verificar se usuario esta logado
    //Verificar se o usuario ja votou no projeto x
        //se sim, disable no botao + mensagem de erro, caso ele mesmo assim clique
        //senao habilitar o botao
    //apos o voto, desabilitar o botao
    //mostrar mensagem de voto
    import { ref } from 'vue';

    const props = defineProps({ projectInfo:Object })
    const emit = defineEmits(["updateVoteCount"]);
    let showVoteRequestFailError = ref(false);
    let showVoteRequestFailSuccess = ref(false);


    function performVote(event) {
        console.log("performVote");
        sendRequest(prepareRequest());
    }

    function getProjectInfo() {
        return props.projectInfo;
    }

    function prepareRequest(){
        console.log("prepareRequest");
        //getUserInfo();
        let project = getProjectInfo();
        let date = new Date().toISOString().slice(0, 10);
        //"projetoId" >> project.id assim q o DTO de projeto for ajustado
        let payload = {
            "projetoId": 5, //tem q voltar o id no DTO, por enquanto vai ficar hardcoded em 1
            "usuarioId": 107, //vai receber informacoes do user logado (precisamos criar um global state para pegar essa info de qualquer lugar)
            "dataCriacao" : date,
            "nome": project.nome
        }
        return payload;
    }

    function sendRequest(payload){
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
            if(response.ok) {
                response.text().then((data) => handleVoteSuccessResponse(data, payload));
                console.log("POST votos > success");
            } else {
                response.text().then((data) => handleVoteErrorResponse());
                console.log("POST votos > error");
            }
        })
    }

    function handleVoteSuccessResponse(data, payload) {
        showVoteRequestFailSuccess.value = true;
        updateVotedProject(data, payload);
        console.log("handleVoteSuccessResponse");
    }

    function handleVoteErrorResponse() {
        console.log("handleVoteErrorResponse");
        showVoteRequestFailError.value = true;
    }

    function updateVotedProject(data, payload) {
        console.log("updateVotedProject");
        fetch(`http://localhost:8080/projetos/${payload.projetoId}`)
              .then(res => res.json())
              .then(data => {
                emit("updateVoteCount", data)
        })
    }
</script>

<template>
    <button @click="performVote" :disabled="showVoteRequestFailError || showVoteRequestFailSuccess">Votar</button>
    <p v-show="showVoteRequestFailError" class="red">error</p>
    <p v-show="showVoteRequestFailSuccess" class="green">success</p>
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
    }
</style>