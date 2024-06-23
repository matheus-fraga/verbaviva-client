<script setup>
import { ref, onMounted, h } from "vue";
import { NSpace, NDivider, NDataTable, NButton, NCard, NFlex, NInput, useMessage, useNotification, useDialog, NGrid, NGridItem, NGi } from "naive-ui";

let innerWidth = ref(window.innerWidth);
window.addEventListener("resize", updateWidthValue);
function updateWidthValue() {
    innerWidth.value = window.innerWidth;
}

const notification = useNotification();
const dialog = useDialog()

let toggleUserList = ref(true);
let userList = ref([]);
let userColumns = [
    {
        title: 'ID',
        key: 'id',
        width: 70
    },
    {
        title: 'Nome',
        key: 'nome',
        ellipsis: {
            tooltip: true
        }
    },
    {
        title: 'CPF',
        key: 'cpf',
        ellipsis: {
            tooltip: true
        }
    },
    {
        key: 'actions',
        width: "100",
        render(row) {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => viewUser(row)
                },

                { default: () => 'Visualizar' }
            )
        }
    },
    {
        key: 'actions',
        width: "75",
        render(row) {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => editUser(row)
                },

                { default: () => 'Editar' }
            )
        }
    },
    {
        key: 'actions',
        width: "100",
        render(row) {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => deleteUser(row)
                },

                { default: () => 'Deletar' }
            )
        }
    }
]

let toggleProjectList = ref(true);
let projectList = ref([]);
let projectColumns = [
    {
        title: 'ID',
        key: 'id',
        width: 70
    },
    {
        title: 'Nome',
        key: 'nome',
        ellipsis: {
            tooltip: true
        }
    },
    {
        title: 'Data de criacao',
        key: 'dataCriacao',
        ellipsis: {
            tooltip: true
        }
    },
    {
        title: 'Criador',
        key: 'nomeUsuario',
        ellipsis: {
            tooltip: true
        }
    },
    {
        title: 'Status',
        key: 'status'
    },
    // {
    // title: 'Votos',
    // key: 'votoIds'
    // },
    {
        title: 'Action',
        key: 'actions',
        width: 100,
        render(row) {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => editProject(row)
                },

                { default: () => 'Editar' }
            )
        }
    },
    {
        title: 'Action',
        key: 'actions',
        render(row) {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => deleteProject(row)
                },

                { default: () => 'Deletar' }
            )
        }
    }
]

let showUserEditComponent = ref(false);
let showViewEditComponent = ref(false);

let selectedUserToEdit = ref({});
let selectedUserToView = ref({});
onMounted(() => {
    getData();
    console.log("mounted");
})

function getData() {
    getUsers();
    getProjects();
}

function getUsers() {
    fetch('http://localhost:8080/usuarios')
        .then(res => {
            if (res.ok) {
                res.json().then((jsonRes) => { obsfucateUserData(jsonRes) });
            } else {
                console.log("erro no get de usuarios");
            }
        })
}

function getProjects() {
    fetch('http://localhost:8080/projetos')
        .then(res => {
            if (res.ok) {
                res.json().then((jsonRes) => { projectList.value = jsonRes; });
            } else {
                console.log("erro no get de projetos");
            }
        })
}

async function editUser(payload) {
    showUserEditComponent.value = true;
    fetch(`http://localhost:8080/usuarios/${payload.id}`)
        .then(res => {
            if (res.ok) {
                res.json().then((jsonRes) => { selectedUserToEdit.value = jsonRes });
            } else {
                console.log("erro no get de usuario");
            }
        })
}

function deleteUser(payload) {
    dialog.warning({
        title: 'Voce quer mesmo realizar esta acao?',
        content: `O usuario ${payload.nome} sera deletado da base de dados. Voce tem`,
        positiveText: 'Sure',
        negativeText: 'Not Sure',
        onPositiveClick: () => {
            console.log("onPositiveClick");
        },
        onNegativeClick: () => {
            console.log("onNegativeClick");
        }
    })
}

function editProject(payload) {
    console.log(payload);
}

function deleteProject(payload) {
    console.log(payload);
}

function obsfucateUserData(payload) {
    payload.forEach(user => {
        user.cpf = transformCPF(user.cpf);
    });
    userList.value = payload;
}

function transformCPF(input) {
    let firstPart = input.substring(0, 2);
    let middlePart = input.substring(2, 11);
    let lastPart = input.substring(11);
    let transformedCPF = `${firstPart}${middlePart.replace(/[0-9]/g, '*')}${lastPart}`;
    return transformedCPF;
}
function viewUser(selectedUser) {
    selectedUserToView.value = selectedUser;
    showViewEditComponent.value = true;
    console.log("viewUser", selectedUser);
}
function updateUser(selectedUserToEdit) {
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
    });
    console.log(selectedUserToEdit);

    let payload = {
        cpf: selectedUserToEdit.cpf,
        nome: selectedUserToEdit.nome,
        dataNascimento: selectedUserToEdit.dataNascimento
    }

    console.log(payload);
    fetch(`http://localhost:8080/usuarios/${selectedUserToEdit.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => {
            if (res.ok) {
                res.json().then((jsonRes) => { handleUpdateUserSuccess(jsonRes) });
            } else {
                res.json().then((jsonRes) => { handleUpdateUserFail(jsonRes) });
            }
        })
}

function handleUpdateUserSuccess(jsonRes) {
    console.log(jsonRes);
    notification.success({
        content: 'Sucesso!',
        meta: `Usuario ${jsonRes.nome} foi atualizado com sucesso!`
    })
    getUsers();
    showUserEditComponent.value = false;
}

function handleUpdateUserFail(jsonRes) {
    console.log(jsonRes);
    notification.error({
        content: 'Erro!',
        meta: `Falha ao atualizar usuario`
    })
    showUserEditComponent.value = false;
}
</script>

<template>
    <n-space vertical align="center">
        <h1>Gerenciamento Administrativo</h1>
    </n-space>

    <n-card size="small">
        <n-grid x-gap="12" :cols="innerWidth <= 700 ? 1 : 3">
            <n-gi :span="2">
                <n-card size="small" >
                    <n-flex justify="center" align="center">
                        <h2>Usuarios</h2>
                        <n-button type="primary" block @click="toggleUserList = !(toggleUserList)">{{ toggleUserList == true ?
                            "Esconder lista" : "Mostrar lista" }}</n-button>
                        <n-data-table :scroll-x="700" striped small max-height="300"
                            v-show="userList.length > 0 && toggleUserList" :columns="userColumns"
                            :data="userList"></n-data-table>
                    </n-flex>
                </n-card>
            </n-gi>
            <n-gi>

                <n-card v-show="showUserEditComponent" size="small" closable
                    @close="() => { showUserEditComponent = false; selectedUserToEdit = {} }">
                    <h2>Editar usuario</h2>
                    <n-input v-model:value="selectedUserToEdit.nome"></n-input>
                    <n-input v-model:value="selectedUserToEdit.cpf" disabled></n-input>
                    <n-input v-model:value="selectedUserToEdit.dataNascimento"></n-input>
                    <n-button type="primary" block @click="() => { updateUser(selectedUserToEdit) }">Editar</n-button>
                </n-card>

                <n-card v-if="showViewEditComponent" size="small" closable @close="() => { showViewEditComponent = false; selectedUserToView = {} }">
                    <h4>Visualizando: {{ selectedUserToView.nome }} </h4>
                    <p>Nome: {{ selectedUserToView.nome }}</p>
                    <p>Documento: {{ selectedUserToView.cpf }}</p>
                    <p>Data de nascimento: {{ selectedUserToView.dataNascimento }}</p>
                    <p>Votos em projetos: {{selectedUserToView.votos.length}}</p>

                    <h4>{{ selectedUserToView.projetos.length == 0 ? "Usuario nao propos nenhum projeto.": "Propostas: " + selectedUserToView.projetos.length }}</h4>
                    <div size="small" hoverable class="spacer" v-for="project in selectedUserToView.projetos" :key="project.nome">
                        <n-card size="small" class="projectView">
                            <n-space vertical>
                                <p>Id: {{ project.id }}</p>
                                <p>Nome: {{ project.nome }}</p>
                                <p>Descricao: {{ project.descricao }}</p>
                                <p>Status: {{ project.status }}</p>
                                <p>Data de criacao: {{ project.dataCriacao }}</p>
                            </n-space>
                        </n-card>
                    </div>
                </n-card>
                
            </n-gi>
        </n-grid>
        
        <n-grid x-gap="12" :cols="innerWidth <= 700 ? 1 : 3">
            <n-gi :span="2">
                <n-card size="small">
                    <n-flex justify="center" align="center">
                        <h2>Projetos</h2>
                        <n-button type="primary" block @click="toggleProjectList = !(toggleProjectList)">{{ toggleProjectList ==
                            true ? "Esconder lista" : "Mostrar lista" }}</n-button>
                        <n-data-table :scroll-x="700" striped small max-height="300"
                            v-show="projectList.length > 0 && toggleProjectList" :columns="projectColumns"
                            :data="projectList"></n-data-table>
                    </n-flex>
                </n-card>
            </n-gi>
        </n-grid>

    </n-card>
</template>

<style>
.projectView  p {
    margin: 0;
}
.max-width-800 {
    max-width: 600px;
}
</style>