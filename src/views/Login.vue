<script setup>
import { useUserStore } from "../stores/user";
const store = useUserStore();
const email = ref("");
const password = ref("");
</script>

<template>
    <section>
        <h1>Login or register</h1>
        <form>
            <input type="email" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Password" v-model="password" />
            <div>
                <button type="button" @click="store.login(email, password)">
                    Login
                </button>
                <button type="button" @click="store.register(email, password)">
                    Register
                </button>
            </div>
        </form>
    </section>
</template>
