<script setup>
  import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
  import Navbar from '../components/Navbar.vue'
  import ProjectList from '../components/ProjectList.vue'
</script>

<template>
    <Navbar/>
    <p>this is the project view page</p>
    <p class="red">DEV: para peformar votos:</p>
    <p class="red">Em components/ProjectVote.vue > prepareRequest()</p>
    <p class="red">Modifique o "projetoId" e "usuarioId"</p>
    <ProjectList/>  
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