<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { user } from "./stateManagement/user.js";
console.log("user.isSignedIn", user.isSignedIn);
user.initialize();
</script>