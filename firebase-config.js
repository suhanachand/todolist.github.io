
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = { apiKey: "...", authDomain: "...", projectId: "...", ... };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.solunaSignIn = async function(){
  try{
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // optionally send user info to server or save locally:
    localStorage.setItem('sol_user', JSON.stringify({name:user.displayName,email:user.email}));
    alert('Signed in as ' + user.displayName);
  }catch(err){ console.error(err); alert('Sign in failed'); }
}
*/
console.warn('Firebase not configured. Paste your config in public/js/firebase-config.js');
