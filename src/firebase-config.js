// 1. Go to https://console.firebase.google.com, create a free project.
// 2. Inside the project, click "Build > Firestore Database" and create a
//    database (test mode is fine to get started).
// 3. Click the gear icon > Project settings > General, scroll to
//    "Your apps", click the </> (web) icon, register an app, and it will
//    show you a config object exactly like the shape below. Paste your
//    real values in here.

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
