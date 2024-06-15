<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
import ProjectVote from '../components/ProjectVote.vue';
import { NButton, NCard, NSpace, NSwitch, NTag } from 'naive-ui';
import { user } from "../stateManagement/user.js";

const emit = defineEmits(["updateProjectInfo"]);

let projectsPayload = ref({});
let showProjects = ref(false);
let showFetchError = ref(false);
let showFilters = ref(true);
let filters = ref([false,false,false,false]);
let loginButton = ref(user.getUserData().isSignedIn);

onBeforeMount(() => {
  console.log("onBeforeMount");
  getProjects();
})

onMounted(() => {
  console.log("onMounted");
})

async function getProjects() {
  let response = await fetch(`http://localhost:8080/projetos`);
  if (response.ok) {
    let jsonResponse = await response.json();
    projectsPayload.value = jsonResponse;
    setShowProjectsTrue();
    console.log("success");
  } else {
    setShowProjectsFalse()
    toggleShowFetchError();
    console.log("error");
  }
}

//event handlers
function updateVoteCount(response) {
  console.log("updateVoteCount");
  console.log(response);
  let foundIndex = getProjectByNome(response.nome);
  if (foundIndex != -1) {
    projectsPayload.value[foundIndex] = response;
  }
}

function emitLoginClick() {
  console.log("emitLoginClick");
}

//helpers
function setShowProjectsTrue() {
  if(!showProjects.value) {
    showProjects.value = true;
  }
}

function setShowProjectsFalse() {
  if(showProjects.value) {
    showProjects.value = false;
  }
}
function toggleShowFetchError() {
  showFetchError.value = !(showFetchError.value);
}

function toggleShowFilters(event) {
  showFilters.value = !(showFilters.value)
}

function toggleLogin() {
  if(loginButton.value) {
    loginButton.value = false;
    user.signOut();
    console.log("logout");
  } else {
    loginButton.value = true;
    user.signIn();
    console.log("login");
  }  
  getProjects();
}

function getProjectByNome(projectId) { //a ideia e trocar nome por id
  let obj = Object.values(projectsPayload.value)
  let foundIndex = obj.findIndex((x) => {
    return x.nome == projectId; //usar x.id
  });

  return foundIndex;
}

</script>

<template>
    <n-space>
    <n-switch @click="toggleLogin" :value="loginButton">
      <template #checked>
        user logged in
      </template>
      <template #unchecked>
        user logged out
      </template>
    </n-switch>
  </n-space>

  <n-space>
    <n-switch @click="toggleShowFilters" :value="showFilters" :round="false">
      <template #checked>
        Mostrar filtros
      </template>
      <template #unchecked>
        Esconder filtros
      </template>
    </n-switch>
  </n-space>
  <div v-show="showFilters">
    <n-card title="Filtrar por:" size="small">
      <n-tag v-model:checked="filters[0]" checkable value="mostVoted">Mais votados</n-tag>
      <n-tag v-model:checked="filters[1]" checkable value="leastVoted">Menos votados</n-tag>
      <n-tag v-model:checked="filters[2]" checkable value="mostRecent">Mais recentes</n-tag>
      <n-tag v-model:checked="filters[3]" checkable value="leastRecent">Menos recentes</n-tag>
    </n-card>
  </div>

  <div v-show="showProjects">
    <n-card size="small" hoverable class="spacer" v-for="project in projectsPayload" :key="project.nome">
      <h6>{{ project.nome }}</h6>
      <p><span>Descricao:</span> {{ project.descricao }}</p>
      <p><span>Criado em:</span> {{ String(project.dataCriacao).split("-").reverse().join("/") }}</p>
      <p><span>Proposta por:</span> {{ project.nomeUsuario }}</p>
      <div class="h-flex">
        <p class="votes">{{ project.votoIds.length }}</p>
        <ProjectVote :project-info="project" @update-vote-count="updateVoteCount" @emit-login-click="emitLoginClick" :user-state="user.getUserData()"/>
      </div>
    </n-card>
  </div>
</template>

<style scoped>
p {
  margin: 0;
  font-size: 12px;
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

span {
  color: rgb(124, 124, 124);
}

.h-flex {
  display: flex;
  align-items: center;
}

.votes {
  font-size: 30px;
  margin-right: 10px;
}

.n-tag {
  border: 1px dotted;
  margin: 2px;
}
</style>