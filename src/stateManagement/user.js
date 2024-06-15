import { reactive, watch, watchEffect } from 'vue'

export const user = reactive({
    isSignedIn: false,
    data: {},
    
    signIn() {
        this.isSignedIn = true;
        this.data = {userName: "test", id: 123};
    },
    signOut() {
        this.isSignedIn = false;
        this.data = {};
    },
    getUserData() {
        return JSON.parse(localStorage.getItem("userDataStorage"));
    },
    initialize() {
        console.log("initialize");
        if(!localStorage.getItem("userDataStorage")) {
            localStorage.setItem("userDataStorage", JSON.stringify(this));
        } else {
            this.isSignedIn = this.getUserData().isSignedIn;
            this.data = this.getUserData().data;
        }
    },
    clear() {
        localStorage.removeItem("userDataStorage");
    }
})

watch(user, (newValue) => {
    localStorage.setItem("userDataStorage", JSON.stringify(newValue));
    console.log("new value to localStorage", JSON.parse(localStorage.getItem("userDataStorage")));
})