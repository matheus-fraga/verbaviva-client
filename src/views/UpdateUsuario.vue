<template>
  <main>
      <Navbar/>
      <div class="my-5">
          <div class="mx-auto w-25 " style="max-width:100%;">
            <h2 class="text-center mb-3">Editar Usuário</h2>
            <form @submit.prevent="updateUsuario">
              <!--nome-->
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                  <label for="nome" class="form-label">Nome</label>
                  <input id="nome"  type="text" name="nome" class="form-control" placeholder="Nome" required v-model="usuario.nome">
                </div>
              </div>

              
              <!--CPF-->
              <div class="row">
                  <div class="col-md-12 form-group mb-3">
                    <label for="cpf" class="form-label">CPF</label>
                    <input id="cpf" type="text"  name="cpf" class="form-control" placeholder="CPF" required v-model="usuario.cpf" >
                  </div>
                </div>

              <!--Data de nascimento-->
              <div class="row">
                  <div class="col-md-12 form-group mb-3">
                    <label for="dataNascimento" class="form-label">Phone Number</label>
                    <input id="dataNascimento" type="text"  name="dataNascimento" class="form-control" placeholder="Data de nascimento" required v-model="usuario.dataNascimento" >
                  </div>
                </div>             
              
             
              <div class="row">
                <div class="col-md-12 form-group">
                  <input class="btn btn-primary w-100" type="submit" value="Submit">
                </div>
              </div>
    
              <div>
                
              </div>
            </form>
      
          </div>
        </div>

  </main>
</template>


<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'UpdateUsuario',
  components: {
      Navbar
  },

  data(){
      return {
          usuario: {
              id: '',
              nome: '',
              cpf: '',
              dataNascimento: ''          }
      }
  },

  beforeMount(){
      this.getUsuarios();
  },

  methods: {
    getUsuarios(){
          fetch(`http://localhost:8080/usuarios/${this.$route.params.id}`)
          .then(res => res.json())
          .then(data => {
              this.usuario = data;
              console.log(this.usuario);
          })

      },
      updateUsuario(){
          fetch(`http://localhost:8080/usuarios/${this.usuario.id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.usuario)
          })
          .then(data => {
              console.log(data);
              this.$router.push('/');
          })
      }
  }
}

</script>