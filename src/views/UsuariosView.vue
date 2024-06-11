<template>
  <main>
      <Navbar />

      <!-- Table-->
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <h1 class="text-center">Gerencimamento de usuários</h1>
                  <!--Add button -->
                  <a href="/add" class="btn btn-primary">Adicionar Usuário</a>
                  <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Nome</th>
                          <th scope="col">Cpf</th>
                          <th scope="col">Data de nascimento</th>
                          <th scope="col">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="usuario in usuarios" :key="usuario.id">
                          <th scope="row">{{usuario.id}}</th>
                          <td>{{usuario.nome}}</td>
                          <td>{{usuario.cpf}}</td>
                          <td>{{usuario.dataNascimento}}</td>
                          <td>
                            <a class="btn btn-primary" :href="`/edit/${usuario.id}`">Editar</a>
                            <button class="btn btn-danger mx-2" @click="deleteUsuario(usuario.id)">Remover</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
              </div>
          </div>
      </div>
      
  </main>
</template>


<script>
import Navbar from '../components/Navbar.vue'

  export default {
      name: 'UsuariosView',
      components: {
          Navbar
      },
      data() {
          return {
              usuarios: []
          }
      },

      beforeMount(){
          this.getUsuarios()
      },

      methods: {
          getUsuarios(){
              fetch('http://localhost:8080/usuarios')
              .then(res => res.json())
              .then(data => {
                  this.usuarios = data
                  console.log(data)
              })
          },
          deleteUsuario(id){
              fetch(`http://localhost:8080/usuarios/${id}`, {
                  method: 'DELETE'
              })
              .then(data => {
                  console.log(data)
                  this.getUsuarios()
              })
          }
      }

  }

</script>