import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbZAqpCD5a9TSxiYd3FXFHSaHlrwr1BXA",
  authDomain: "project-music-app-90029.firebaseapp.com",
  projectId: "project-music-app-90029",
  storageBucket: "project-music-app-90029.appspot.com",
  messagingSenderId: "1095055297869",
  appId: "1:1095055297869:web:77003382a6470e278d3b04",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
