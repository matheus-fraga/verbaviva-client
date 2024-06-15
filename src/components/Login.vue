<script setup>
import { NButton, NCard, NSpace, NSwitch, NTag, NInput, NDatePicker, NDivider } from 'naive-ui';
import { onMounted, ref } from 'vue';
const emit = defineEmits(["emitLoginComponentClose"]);


let dividerTextPlacement = ref("center");
onMounted (()=>{
    setStuffBasedOnScreenSize();
})

function setStuffBasedOnScreenSize() {
    let width = window.innerWidth;
  if (width <= 900) {
    dividerTextPlacement.value = "center";
  } else {
    dividerTextPlacement.value = "left";
  }
}
function emitLoginComponentClose() {
    emit("emitLoginComponentClose")
}
</script>

<template>
    <div>
        <n-card title="Login" hoverable closable size="small" @close="emitLoginComponentClose">
            <n-space vertical>
                <n-input size="tiny" placeholder="CPF" />
                <n-date-picker size="tiny" type="date" />
                <n-button size="tiny" type="primary">Login</n-button>
            </n-space>
        </n-card>
    </div>
</template>