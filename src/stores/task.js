import { ID, Query } from 'appwrite';
import { databases } from '../appwrite';
const dbID = import.meta.env.VITE_APPWRITE_DB_ID; // Replace with your database ID
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Replace with your collection ID

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: []
  }),
  actions: {
    async init() {
      const response = await databases.listDocuments(dbID, collectionId, [
        Query.orderDesc('$createdAt'),
        Query.limit(10)
      ]);
      this.tasks = response.documents;
    },
    async add(task) {
      const response = await databases.createDocument(dbID, collectionId, ID.unique(), task);
      this.tasks = [response, ...this.tasks].slice(0, 10);
    },
    async remove(id) {
      await databases.deleteDocument(dbID, collectionId, id);
      this.tasks = this.tasks.filter((task) => task.$id !== id);
      await this.init(); // Refetch tasks to ensure we have 10 items
    }
  }
});
