<script setup>
import { useUserStore } from "./stores/user";
import { useBookStore } from "./stores/book";
const userStore = useUserStore();
const bookStore = useBookStore();
const router = useRouter();
onMounted(async () => {
  await userStore.init();
  if (userStore.user !== null) {
    bookStore.init();
    router.push('/about');
  }
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <button v-if="userStore.user !== null" @click="userStore.logout">Logout</button>
      <div v-if="userStore.user !== null">
        <span>{{ userStore.user?.emailVerification ?
          `Admin mode, ${userStore.user.email}` : `Guest mode, ${userStore.user.email}` }} </span>
      </div>

      <nav>
        <RouterLink to="/" v-if="userStore.user && userStore.user.$id === bookStore.books[0]?.userId">Home</RouterLink>
        <RouterLink to="/about">Books</RouterLink>
        <RouterLink to="/login" v-if="!userStore.user">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
