<script setup>
import { ref, onBeforeMount } from 'vue';
import NeoNavBar from '../components/NeoNavBar.vue'
import { NCarousel, NGradientText, NCard, NButton, NDivider, NIcon, NTag, NSpace } from 'naive-ui'
import { ArrowForwardRound, SwipeFilled } from '@vicons/material'

let gradientColor = ref("linear-gradient(90deg, rgba(120,10,10,1) 12%, rgba(172,55,55,1) 50%, rgba(120,10,10,1) 76%)");
let slidesPerView = ref("3");
let isMobile = ref(false);

onBeforeMount(() => {
  setSlidesPerViewProperty();
  isTouchScreen();
})

function setSlidesPerViewProperty() {
  let width = window.innerWidth;
  if (width <= 600) {
    slidesPerView.value = 1;
    isMobile.value = true;
  } else if(width > 600 && width <= 900) {
    slidesPerView.value = 2;
    isMobile.value = true;
  }
  console.log(slidesPerView.value);
}

function isTouchScreen(){
  if ("maxTouchPoints" in navigator) {
    isMobile.value = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    isMobile.value = navigator.msMaxTouchPoints > 0;
  }
  console.log("touchscreen", isMobile.value);
}

</script>
<template>
  <main>
    <NeoNavBar />
    <n-space justify="center">
      <n-gradient-text :gradient="gradientColor">
        <h1>Seja a mudança para melhorar a sociedade</h1>
      </n-gradient-text>
    </n-space>
    <n-gradient-text :gradient="gradientColor">
      <h2>Exerca seu direito e escolha quais propostas devem ser priorizadas</h2>
    </n-gradient-text>

    <n-space v-show="isMobile" justify="center">
      <n-tag size="large" type="info" >Deslize para visualizar!
        <n-icon size="20">
          <swipe-filled />
        </n-icon>
      </n-tag>
    </n-space>

    <n-carousel class="m-width" :space-between="10" autoplay :slides-per-view="slidesPerView" :loop="true">

      <n-card hoverable>
        <template #cover>
          <img class="carousel-img" src="/src/assets/proponha.jpg">
        </template>
        <n-divider title-placement="center">
          <h1>Proponha</h1>
        </n-divider>
        <p>Contribua ativamente para que a sociedade identifique claramente as localidades que mais necessitam de apoio. Proponha um projeto inovador e mostre a todos o seu desejo genuíno de promover mudanças significativas e positivas. Juntos, podemos construir uma comunidade mais agradável e organizada!</p>
        <n-button block type="primary" color="rgb(172, 55, 55)" tag="a" href="/userRegister">Registre-se agora mesmo!
          <n-icon size="20">
            <arrow-forward-round />
          </n-icon>
        </n-button>
      </n-card>

      <n-card hoverable>
        <template #cover>
          <img class="carousel-img" src="/src/assets/vote.jpg">
        </template>
        <n-divider title-placement="center">
          <h1>Vote</h1>
        </n-divider>
        <p>Exerça o seu direito e participe ativamente, votando em projetos já propostos pela sua comunidade. Somente assim será possível compreender plenamente a relevância e o impacto das mudanças que podem transformar positivamente o seu entorno. Seja um agente de mudança e ajude a construir um futuro melhor para todos!</p>
        <n-button block type="primary" color="rgb(172, 55, 55)" tag="a" href="/projects">De uma olhada nos projetos!
          <n-icon size="20">
            <arrow-forward-round />
          </n-icon>
        </n-button>
      </n-card>

      <n-card hoverable>
        <template #cover>
          <img class="carousel-img" src="/src/assets/diferenca.jpg">
        </template>
        <n-divider title-placement="center">
          <h1>Faça a diferença</h1>
        </n-divider>
        <p>Compreenda qual é o nosso propósito, como operamos e de que maneira você é uma parte essencial desta iniciativa. O poder de decisão e a capacidade de influenciar mudanças significativas estão em suas mãos! Participe ativamente e faça a diferença conosco!</p>
        <n-button block type="primary" color="rgb(172, 55, 55)" tag="a" href="/pb">Sobre nós
          <n-icon size="20">
            <arrow-forward-round />
          </n-icon>
        </n-button>
      </n-card>

    </n-carousel>

    <n-gradient-text :gradient="gradientColor">
      <h1>PARTICIPE AGORA</h1>
      <h2>Seja a mudança. Faça a mudanca chegar ate voce!</h2>
    </n-gradient-text>
  </main>
</template>



<style scoped>
.m-width {
  min-width: 300px;
  width: 100%;
}

.carousel-img {
  width: 100%;
  min-height: 250px;
  height: clamp(250px, 300px, 400px);
  object-fit: cover;
  border-radius: 10px;
}

.n-gradient-text {
  white-space: break-spaces;
  text-align: right;
}

.n-divider {
  margin-top: 5px;
  margin-bottom: 5px;
}
.n-card p {
  text-align: justify;
}

.n-card .n-button {
  justify-content: center;
}

.n-card .n-button .n-icon {
  margin-left: 10px;
}
</style>