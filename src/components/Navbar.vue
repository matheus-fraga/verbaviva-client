<template>
  <main>
      <!--Bootstrap Navbar-->
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
              <a class="navbar-brand" href="/">VERBA VIVA</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                  <a class="nav-link" href="/projects">Projetos</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="/pb">Entenda o orcamento participativo</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="/userRegister">Participe</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="/users">Usuarios (dev)</a>
                  </li>
              </ul>            
              </div>
          </div>
      </nav>
  </main>
</template>

<script>
    import { NButton, useNotification, NIcon } from 'naive-ui'
    import { AddCircleRound } from '@vicons/material'
</script>