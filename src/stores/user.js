import { defineStore } from 'pinia';
import { ID } from 'appwrite';
import { account } from '../appwrite';
//import { useRouter } from 'vue-router';
//const router = useRouter();
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loadingSession: false
  }),
  actions: {
    async init() {
      try {
        this.user = await account.get();
      } catch (e) {
        this.user = null;
        console.log('Error', e.message);
      }
    },
    async register(email, password) {
      try {
        this.loadingSession = true;
        await account.create(ID.unique(), email, password);
        await this.login(email, password);
        this.loadingSession = false;
        //this.router.push('/');
      } catch (error) {
        console.log(error.message);
        this.loadingSession = false;
      }
    },
    async login(email, password) {
      try {
        this.loadingSession = true;
        await account.createEmailSession(email, password);
        this.loadingSession = false;
        this.user = await account.get();
        if (this.user !== null) {
          if (this.user.emailVerification === false) {
            await this.router.push('/about');
          } else {
            await this.router.push('/');
          }
        }
        // Redirect to home page
      } catch (error) {
        this.loadingSession = false;
        console.log(error.message); // Redirect
      }
    },
    async logout() {
      try {
        this.loadingSession = true;
        await account.deleteSession('current');
        this.loadingSession = false;
        this.router.push('/login');
      } catch (error) {
        this.loadingSession = false;
        console.log(error.message);
      }
      this.user = null;
    }
  }
});
