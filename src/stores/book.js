import { ID, Query } from 'appwrite';
import { databases } from '../appwrite';
const dbID = import.meta.env.VITE_APPWRITE_DB_ID; // Replace with your database ID
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Replace with your collection ID

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    specificBook: null
  }),
  actions: {
    async init() {
      const response = await databases.listDocuments(dbID, collectionId, [
        Query.orderDesc('$createdAt'),
        Query.limit(10)
      ]);
      this.books = response.documents;
    },
    async getSingleBook(docId) {
      const promise = await databases.getDocument(dbID, collectionId, docId).then(
        function (response) {
          console.log(response);
          return response; // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
      this.specificBook = promise;
    },
    async add(book) {
      const response = await databases.createDocument(dbID, collectionId, ID.unique(), book);
      this.books = [response, ...this.books].slice(0, 10);
    },
    async remove(id) {
      await databases.deleteDocument(dbID, collectionId, id);
      this.books = this.books.filter((book) => book.$id !== id);
      await this.init(); // Refetch books to ensure we have 10 items
    }
  }
});
