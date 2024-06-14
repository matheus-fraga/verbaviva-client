<script setup>
import { ref, onBeforeMount } from 'vue';
import Navbar from '../components/Navbar.vue'
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
    <Navbar />
    <n-space justify="center">
      <n-gradient-text :gradient="gradientColor">
        <h1>Seja a mudanca para melhorar a sociedade</h1>
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
          <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
        </template>
        <n-divider title-placement="center">
          <h1>Proponha</h1>
        </n-divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci itaque tenetur cumque ratione ut autem cum
          minus laborum dolor a, saepe dolorum veritatis, voluptatum quos dolores accusamus, quas sapiente. Veniam!</p>
        <n-button block type="primary" color="rgb(172, 55, 55)" tag="a" href="/userRegister">Registre-se agora mesmo!
          <n-icon size="20">
            <arrow-forward-round />
          </n-icon>
        </n-button>
      </n-card>

      <n-card hoverable>
        <template #cover>
          <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
        </template>
        <n-divider title-placement="center">
          <h1>Vote</h1>
        </n-divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci itaque tenetur cumque ratione ut autem cum
          minus laborum dolor a, saepe dolorum veritatis, voluptatum quos dolores accusamus, quas sapiente. Veniam!</p>
        <n-button block type="primary" color="rgb(172, 55, 55)" tag="a" href="/projects">De uma olhada nos projetos!
          <n-icon size="20">
            <arrow-forward-round />
          </n-icon>
        </n-button>
      </n-card>

      <n-card hoverable>
        <template #cover>
          <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
        </template>
        <n-divider title-placement="center">
          <h1>Faca a diferenca</h1>
        </n-divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci itaque tenetur cumque ratione ut autem cum
          minus laborum dolor a, saepe dolorum veritatis, voluptatum quos dolores accusamus, quas sapiente. Veniam!</p>
        <n-button block type="primary" color="rgb(172, 55, 55)" tag="a" href="/userRegister">Vote!
          <n-icon size="20">
            <arrow-forward-round />
          </n-icon>
        </n-button>
      </n-card>

    </n-carousel>

    <n-gradient-text :gradient="gradientColor">
      <h2>Seja a mudanca</h2>
    </n-gradient-text>
    <n-gradient-text :gradient="gradientColor">
      <h2>Faca a mudanca chegar ate voce</h2>
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