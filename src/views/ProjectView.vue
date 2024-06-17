<script setup>
  import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
  import Navbar from '../components/Navbar.vue'
  import NeoNavBar from '../components/NeoNavBar.vue'
  import ProjectList from '../components/ProjectList.vue'
  import { NButton, useNotification, NNotificationProvider } from 'naive-ui'
</script>

<template>
    <NeoNavBar />
    <p class="red">para que o botao criar projeto apareca, faca o login e atualize a pagina (por enquanto)</p>
    <n-notification-provider>
    <ProjectList/>
    </n-notification-provider>

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