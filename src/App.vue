<template>
  <n-message-provider>
  <div id="app">
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <router-view></router-view>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </div>
</n-message-provider>
</template>

<script setup>
import { user } from "./stateManagement/user.js";
import { NMessageProvider, NNotificationProvider, NDialogProvider } from 'naive-ui'
console.log("user.isSignedIn", user.isSignedIn);
user.initialize();
</script>