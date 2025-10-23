// Firebase sign-in helper (paste your config here).
// After pasting your config, window.solunaSignIn() becomes available and main.js will call it when the user clicks "Sign in".

// EXAMPLE USAGE:
// 1) Go to Firebase Console -> Web App -> copy config object
// 2) Paste it below inside firebaseConfig
// 3) Uncomment the import lines and the initialize logic.

// NOTE: Live Server doesn't support ES modules imported via file:// in some browsers.
// If sign-in fails locally, test on a hosted origin (Netlify, Firebase Hosting, or http://localhost served by a dev server).

/* Example (uncomment and replace placeholders):
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    appId: "APP_ID",
    // ...other fields
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  window.solunaSignIn = async function(){
    try{
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('sol_user', JSON.stringify({name:user.displayName,email:user.email}));
      document.querySelectorAll('[id^=userEmail]').forEach(el=>el.innerText = user.email || 'user');
      alert('Signed in as ' + user.displayName);
    }catch(err){ console.error(err); alert('Sign-in failed: '+err.message) }
  };

  window.solunaSignOut = async function(){
    await signOut(auth);
    localStorage.removeItem('sol_user');
    document.querySelectorAll('[id^=userEmail]').forEach(el=>el.innerText = 'guest');
  };
</script>
*/

console.warn('Firebase not configured. Open js/firebase-config.js and paste your Firebase web app config and sign-in code. See comments.');
