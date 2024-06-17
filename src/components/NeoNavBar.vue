<script setup>
import { NButton, NCard, NSpace, NSwitch, NTag, NIcon, NCollapse, NCollapseItem } from 'naive-ui';
import { AddCircleRound, LogInRound, RecordVoiceOverRound, WavingHandRound, DescriptionOutlined, WbIncandescentOutlined, PersonOutlineOutlined, PlusRound, LightbulbRound, InfoRound } from '@vicons/material'
import { ref } from 'vue';
import { user } from "../stateManagement/user.js";

window.addEventListener("resize", updateWidthValue);
const MOBILE_SIZE = 700;
let innerWidth = ref(window.innerWidth);
let expandMobileMenu = ref(false);
let isUsersignedIn = ref(user.getUserData().isSignedIn);

function toggleExpandMobileMenu() {
    expandMobileMenu.value = !(expandMobileMenu.value);
}
function updateWidthValue() {
    innerWidth.value = window.innerWidth;
}
//fazer funcao para isUsersignedIn reagir ao emit do componente de login
</script>
<template>
    <div>
        <n-card size="small">
            <n-space v-show="innerWidth > MOBILE_SIZE" justify="space-between" align="center">
                <n-space justify="start" align="center">
                    <n-button text tag="a" href="/">
                        <h3>Verba Viva</h3>
                    </n-button>
                    <n-button text tag="a" href="/userRegister">Participe</n-button>
                    <n-button text tag="a" href="/projects">Projetos</n-button>
                    <n-button v-if="isUsersignedIn" text tag="a" href="/create_project">Criar projeto</n-button>
                </n-space>
                <n-space justify="end" align="center">
                    <n-button text tag="a" href="/pb">Entenda o orcamento participativo</n-button>
                    <n-button type="primary" tag="a" href="/pb">Login</n-button>
                </n-space>
            </n-space>

            <!-- MOBILE -->
            <div v-show="innerWidth <= MOBILE_SIZE">

                <n-space justify="center" align="center" vertical>
                    <n-button text tag="a" href="/">
                        <h2>Verba Viva</h2>
                    </n-button>
                    <n-button @click="toggleExpandMobileMenu" text href="/"><n-icon><plus-round /></n-icon>{{expandMobileMenu == false ? "Expandir menu" : "Esconder menu" }}
                    </n-button>
                </n-space>
                <n-space justify="start" v-show="expandMobileMenu">
                    <n-space justify="start" vertical>
                        <n-button text tag="a" href="/userRegister"><n-icon><waving-hand-round /></n-icon>
                            Participe</n-button>
                        <n-button text tag="a" href="/projects"><n-icon><lightbulb-round /></n-icon> Projetos</n-button>
                        <n-button v-if="isUsersignedIn" text tag="a" href="/create_project"><n-icon><plus-round /></n-icon> Criar
                            projeto</n-button>
                        <n-button text tag="a" href="/pb"><n-icon><info-round /></n-icon> Entenda o orcamento
                            participativo</n-button>
                        <n-button block type="primary" tag="a" href="/pb">Login</n-button>
                    </n-space>
                </n-space>
            </div>
        </n-card>
    </div>
</template>

<style>
.n-button {
    align-self: center;
}

.n-button h3 {
    margin: 0;
}

.n-button .n-icon {
    align-self: center;
    margin-right: 5px;
}</style>