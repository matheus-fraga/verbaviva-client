<script setup>
    import { ref, onMounted, h } from "vue";
    import { NSpace, NDivider, NDataTable, NButton, NCard, NFlex, NInput } from "naive-ui";

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
            title: 'Action',
            key: 'actions',
                render (row) {
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
            title: 'Action',
            key: 'actions',
                render (row) {
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
                render (row) {
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
                render (row) {
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
    let selectedUserToEdit = ref({});
    onMounted(()=>{
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
                if(res.ok) {
                    res.json().then((jsonRes) => {obsfucateUserData(jsonRes)});
                } else {
                    console.log("erro no get de usuarios");
                }
            })
    }

    function getProjects() {
        fetch('http://localhost:8080/projetos')
            .then(res => {
                if(res.ok) {
                    res.json().then((jsonRes) => {projectList.value = jsonRes;});
                } else {
                    console.log("erro no get de projetos");
                }
            })
    }

    async function editUser(payload) {
        showUserEditComponent.value = true;
        fetch(`http://localhost:8080/usuarios/${payload.id}`)
            .then(res => {
                if(res.ok) {
                    res.json().then((jsonRes) => { selectedUserToEdit.value = jsonRes});
                } else {
                    console.log("erro no get de usuario");
                }
            })
    }

    function deleteUser(payload) {
        console.log(payload);
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

    function updateUser(selectedUserToEdit) {
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
            if(res.ok) {
                    res.json().then((jsonRes) => {console.log(jsonRes)});
                } else {
                    console.log("erro no updateUser");
                }
          })
    }
</script>

<template>
    <n-space vertical align="center" >
        <h1>Gerenciamento Administrativo</h1>
    </n-space>
    <n-card size="small">
        <n-space vertical align="center" >
            <n-card v-show="showUserEditComponent" size="small" closable @close="()=> {showUserEditComponent = false; selectedUserToEdit = {}}">
                <h1>Editar usuario</h1>
                <n-input v-model:value="selectedUserToEdit.nome"></n-input>
                <n-input v-model:value="selectedUserToEdit.cpf" disabled></n-input>
                <n-input v-model:value="selectedUserToEdit.dataNascimento"></n-input>
                <n-button type="primary" block @click="()=>{updateUser(selectedUserToEdit)}">Editar</n-button>
            </n-card>
        </n-space>  
            <n-flex >
                <n-card size="small">
                    <n-flex justify="center" align="center">
                        Usuarios
                        <n-button type="primary"  block @click="toggleUserList = !(toggleUserList)">{{toggleUserList == true ? "Esconder lista" : "Mostrar lista"}}</n-button>
                        <n-data-table :scroll-x="700" striped small max-height="300" v-show="userList.length>0 && toggleUserList" :columns="userColumns" :data="userList"></n-data-table>
                    </n-flex>
                </n-card>
                <n-card size="small">
                    <n-flex justify="center" align="center">
                        Projetos
                        <n-button type="primary" block @click="toggleProjectList = !(toggleProjectList)">{{toggleProjectList == true ? "Esconder lista" : "Mostrar lista"}}</n-button>
                        <n-data-table :scroll-x="700" striped small max-height="300" v-show="projectList.length>0 && toggleProjectList" :columns="projectColumns" :data="projectList"></n-data-table>
                    </n-flex>
                </n-card>
            </n-flex>
        </n-card>
  
</template>

<style>
</style>