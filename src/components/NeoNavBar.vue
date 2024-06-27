<script setup>
import { NButton, NCard, NSpace, NSwitch, NTag, NIcon, NCollapse, NCollapseItem, NDropdown, NPopover } from 'naive-ui';
import { AddCircleRound, LogInRound, RecordVoiceOverRound, WavingHandRound, DescriptionOutlined, WbIncandescentOutlined, PersonOutlineOutlined, PlusRound, LightbulbRound, InfoRound, PersonRound, LogOutRound } from '@vicons/material'
import { ref, h } from 'vue';
import { user } from "../stateManagement/user.js";
import eventBus from '../eventHandler/eventBus.js';
import Login from "../components/Login.vue";

eventBus.on('update-login-info-global-event', e => handleUpdateLoginInfoGlobalEvent(e))
function emitUserStateGlobalEvent(userPublicInfoPayload) {
    eventBus.emit('update-login-info-global-event', { data: userPublicInfoPayload });
}

const renderIcon = (icon) => {
    return () => h(NIcon, null, {
        default: () => h(icon)
    });
};

window.addEventListener("resize", updateWidthValue);
const MOBILE_SIZE = 800;
let innerWidth = ref(window.innerWidth);
let expandMobileMenu = ref(false);
let isUsersignedIn = ref(user.getUserData().isSignedIn);
let showLoginButton = ref(!user.getUserData().isSignedIn);
let userDataFromGlobalEvent = ref(user.getUserData());
const dropDownMenuItems = ref([{
    label: "Meus projetos",
    key: "profile",
    icon: renderIcon(LightbulbRound)
},
{
    label: "Logout",
    key: "logout",
    icon: renderIcon(LogOutRound)
}]);

function handleSelect(key) {
    console.log(key);
    if (key === "logout") {
        user.signOut();
        showLoginButton.value = true;
        emitUserStateGlobalEvent({});
    }
    if (key === "profile") {
        //todo
    }
}

function toggleExpandMobileMenu() {
    expandMobileMenu.value = !(expandMobileMenu.value);
}
function updateWidthValue() {
    innerWidth.value = window.innerWidth;
}
function handleUpdateLoginInfoGlobalEvent(userData) {
    console.log("handleUpdateLoginInfoGlobalEvent");
    if (Object.keys(userData.data).length === 0) { //user logged out
        console.log("logout");
        showLoginButton.value = true;
        isUsersignedIn.value = false;
        return;
    }
    console.log("login");
    showLoginButton.value = false;
    userDataFromGlobalEvent.value = userData;
    isUsersignedIn.value = true;
}

//fazer funcao para isUsersignedIn reagir ao emit do componente de login
</script>
<template>
    <div>
        <!-- PC -->
        <n-card size="small">
            <n-space v-show="innerWidth > MOBILE_SIZE" justify="space-between" align="center">
                <n-space justify="start" align="center">
                    <n-button text tag="a" href="/">
                        <h3>Verba Viva</h3>
                    </n-button>
                    <n-button secondary type="success" tag="a" href="/user-register">Participe</n-button>
                    <n-button text tag="a" href="/projects">Projetos</n-button>
                    <n-button v-if="isUsersignedIn" text tag="a" href="/create_project">Criar projeto</n-button>
                </n-space>
                <n-space justify="end" align="center">
                    <n-button text tag="a" href="/pb">Entenda o orcamento participativo</n-button>

                    <n-popover placement="bottom" trigger="click" style="padding: 0">
                        <template #trigger>
                            <n-button v-show="showLoginButton" block type="primary">Login</n-button>
                        </template>
                        <Login />
                    </n-popover>

                    <n-dropdown :options="dropDownMenuItems" @select="handleSelect">
                        <n-button text v-show="!showLoginButton"><n-icon><person-round /></n-icon> Bem-vindo, {{
                            userDataFromGlobalEvent.data.nome || user.getUserData().data.userName }}!</n-button>
                    </n-dropdown>
                </n-space>
            </n-space>

            <!-- MOBILE -->
            <div v-show="innerWidth <= MOBILE_SIZE">

                <n-space justify="center" align="center" vertical>
                    <n-button text tag="a" href="/">
                        <h2>Verba Viva</h2>
                    </n-button>
                    <n-button @click="toggleExpandMobileMenu" text
                        href="/"><n-icon><plus-round /></n-icon>{{ expandMobileMenu == false ? "Expandir menu" : "Escondermenu" }}
                    </n-button>
                </n-space>
                <n-space justify="center" v-show="expandMobileMenu" style="flex-flow: column;">
                    <n-space justify="start" vertical>
                        <n-dropdown :options="dropDownMenuItems" @select="handleSelect">
                            <n-button text v-show="!showLoginButton"><n-icon><person-round /></n-icon> Bem-vindo, {{
                                userDataFromGlobalEvent.data.nome || user.getUserData().data.userName }}!</n-button>
                        </n-dropdown>
                        <n-button secondary type="success" tag="a"
                            href="/userRegister"><n-icon><waving-hand-round /></n-icon>
                            Participe</n-button>
                        <n-button text tag="a" href="/projects"><n-icon><lightbulb-round /></n-icon> Projetos</n-button>
                        <n-button v-if="isUsersignedIn" text tag="a" href="/create_project"><n-icon><plus-round /></n-icon>
                            Criar
                            projeto</n-button>
                        <n-button text tag="a" href="/pb"><n-icon><info-round /></n-icon> Entenda o orcamento
                            participativo</n-button>

                        <n-popover placement="bottom" trigger="click" style="padding: 0">
                            <template #trigger>
                                <n-button block type="primary">Login</n-button>
                            </template>
                            <Login />
                        </n-popover>
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