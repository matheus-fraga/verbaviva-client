<script setup>
  import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
  import ProjectVote from '../components/ProjectVote.vue'
  import { NButton, NCard } from 'naive-ui'


  const emit = defineEmits(["updateProjectInfo"]);
  
  let projectsPayload = ref({});
  let showProjects = ref(false);
  let showFetchError = ref(false);

  onBeforeMount(()=> {
    console.log("onBeforeMount");
    getProjects();
    
  })

  onMounted(()=> {
    console.log("onMounted");
  })

  async function getProjects(){
    let response = await fetch(`http://localhost:8080/projetos`);
    if (response.ok) {
      let jsonResponse = await response.json();
      projectsPayload.value = jsonResponse;
      toggleShowProjects();
      console.log("success");
    } else {
      toggleShowFetchError();
      console.log("error");
    }
  }
  
  //event handlers
  function updateVoteCount(response) {
    console.log("updateVoteCount");
    console.log(response);
    let foundIndex = getProjectByNome(response.nome);
    if(foundIndex != -1) {
      projectsPayload.value[foundIndex] = response;
    }
  }

  //helpers
  function toggleShowProjects() {
    showProjects.value = !(showProjects.value);
  }
  function toggleShowFetchError() {
    showFetchError.value = !(showFetchError.value);
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
      <div v-show="showProjects">
        <n-card size="small" hoverable class="spacer" v-for="project in projectsPayload" :key="project.nome">
          <h6>{{ project.nome }}</h6>
          <p><span>Descricao:</span> {{ project.descricao }}</p>
          <p><span>Criado em:</span> {{ String(project.dataCriacao).split("-").reverse().join("/") }}</p>
          <p><span>Proposta por:</span> {{ project.nomeUsuario }}</p>
          <div class="h-flex">
            <p class="votes">{{ project.votoIds.length }}</p>
            <ProjectVote :project-info="project" @update-vote-count="updateVoteCount"/>
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
</style>