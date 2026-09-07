// Drop-in replacement for the `window.storage` API the app was originally
// built against (Claude's artifact storage). Every method returns the same
// shape, so App.jsx needed no changes — this file is assigned to
// `window.storage` once, in main.jsx, before the app renders.
//
// Everything in this community app is shared (visible to everyone), so this
// wrapper keeps things simple: one Firestore collection, one document per
// key. See README.md for how to fill in firebase-config.js.

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION = "app_kv";

function docIdFor(key) {
  return key.replace(/\//g, "__");
}

export const storage = {
  async get(key) {
    const ref = doc(db, COLLECTION, docIdFor(key));
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { key, value: snap.data().value, shared: true };
  },

  async set(key, value) {
    const ref = doc(db, COLLECTION, docIdFor(key));
    await setDoc(ref, { key, value, updatedAt: Date.now() });
    return { key, value, shared: true };
  },

  async delete(key) {
    const ref = doc(db, COLLECTION, docIdFor(key));
    await deleteDoc(ref);
    return { key, deleted: true, shared: true };
  },

  async list(prefix = "") {
    const col = collection(db, COLLECTION);
    const snap = prefix
      ? await getDocs(query(col, where("key", ">=", prefix), where("key", "<", prefix + "\uf8ff")))
      : await getDocs(col);
    const keys = [];
    snap.forEach((d) => keys.push(d.data().key));
    return { keys, prefix, shared: true };
  },
};
