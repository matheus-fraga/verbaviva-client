<script setup>
import {ref} from 'vue'
import NeoNavBar from '../components/NeoNavBar.vue'
import {NGradientText} from 'naive-ui'

let gradientColor = ref("linear-gradient(90deg, rgba(120,10,10,1) 12%, rgba(172,55,55,1) 50%, rgba(120,10,10,1) 76%)");
</script>

<template>
  <main class="text-center">
    <NeoNavBar />

    <n-gradient-text :gradient="gradientColor">
      <h1>Verba Viva: Uma Jornada para a Gestão Participativa do Município</h1>
    </n-gradient-text>

    <p class="lead">
      Sabe aquela fase do mês em que a conta aperta? É preciso comprar vários itens, mas o dinheiro que sobra não dá para tudo. O que fazer? Simples: priorizamos o essencial e deixamos as compras menos urgentes para depois.
      Imagine se, em vez da sua casa, estivéssemos falando de um município. Nesse caso, você, cidadão, teria a responsabilidade de decidir como investir o dinheiro público, a verba municipal, naquele momento. Agora, imagine um lugar onde você e outras pessoas podem ver e elencar os problemas da região onde moram e promover a mudança. PRONTO!
      <n-gradient-text :gradient="gradientColor">Bem-vindo ao VERBA VIVA!</n-gradient-text>
    </p>

    <p class="lead">
      Você sabia que em 2024, a Prefeitura de Belo Horizonte destina R$73 milhões exclusivamente para obras do Orçamento Participativo (OP)? Sim, sua voz, seu poder!
    </p>

    <NGradientText :gradient="gradientColor">
      <h2 class="my-4">Como funciona o Verba Viva?</h2>
    </NGradientText>

    <p class="lead">
      O OP te coloca no comando das decisões! Você escolhe quais melhorias serão feitas no seu município, garantindo que os recursos públicos sejam investidos em projetos que realmente impactam sua vida.
    </p>

    <p class="lead">
      Cansado de ver o dinheiro público mal utilizado? O OP é a sua chance de mudar isso! Através dele, você pode:
    </p>

    <ul class="list-group list-group-flush mb-4">
      <NGradientText :gradient="black">
        <li class="list-group-item">Propor projetos: Apresente ideias para obras e serviços que beneficiem sua comunidade.</li>
        <li class="list-group-item">Votar nas prioridades: Decida quais projetos receberão os investimentos.</li>
        <li class="list-group-item">Acompanhar a execução: Monitore de perto o andamento das obras e cobre resultados.</li>
      </NGradientText>
    </ul>

    <NGradientText :gradient="gradientColor">
      <p class="text-justify">Junte-se ao Verba Viva e faça a diferença!</p>
    </NGradientText>

    <div class="section-content">
      <NGradientText :gradient="gradientColor">
        <h2 class="my-4">Vantagens do Verba Viva</h2>
      </NGradientText>

      <p class="text-justify">
        O Verba Viva é um programa inovador que simplifica o OP:
      </p>

      <p class="text-justify">Acesso facilitado: Utilize de uma interface simples e amigável para compreender aquilo que seria complicado.</p>

      <p class="text-justify">Informações na palma da mão: Tenha acesso a projetos de todas as regionais de BH e entenda para onde irão após propostos.</p>

      <NGradientText :gradient="gradientColor">
        <p class="text-center">Seu bairro, suas decisões!</p>
        <p class="text-center">Não perca essa oportunidade! Participe do OP e ajude a construir uma Belo Horizonte mais justa, próspera e com a sua cara!</p>
      </NGradientText>
    </div>
  </main>
</template>


