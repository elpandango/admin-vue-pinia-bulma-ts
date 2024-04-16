import {defineStore} from 'pinia';
// import {collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy} from "firebase/firestore";
// import {db} from '@/js/firebase.js';
import {useStoreAuth} from "@/stores/storeAuth.js";

// let notesCollectionRef;
// let notesCollectionQuery;
// let getNotesSnapshot = null;

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();

      // notesCollectionRef = collection(db, "users", storeAuth.user.id, 'notes');
      // notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));

      // this.getNotes();
    },
  },
  getters: {

  },
})
