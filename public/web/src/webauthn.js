
import { getFunctions, httpsCallable } from 'https://esm.sh/firebase/functions';
import { app } from './integration/firebase/firebaseConfig.js';

const functions = getFunctions(app);

async function registerUser(username) {
  console.log(`Registering user: ${username}`);

  try {
    const getRegistrationOptions = httpsCallable(functions, 'getRegistrationOptions');
    const { data: options } = await getRegistrationOptions({ username });

    console.log("Registration options received", options);

    const credential = await navigator.credentials.create(options);
    console.log("Credential created", credential);

    const verifyRegistration = httpsCallable(functions, 'verifyRegistration');
    const { data: verificationResult } = await verifyRegistration({ credential, username });

    console.log("Registration verification result", verificationResult);
  } catch (error) {
    console.error("Registration failed", error);
  }
}

async function authenticateUser(username) {
  console.log(`Authenticating user: ${username}`); 

  try {
    const getAuthenticationOptions = httpsCallable(functions, 'getAuthenticationOptions');
    const { data: options } = await getAuthenticationOptions({ username });
    console.log("Authentication options received", options);
 
    const credential = await navigator.credentials.get(options);
    console.log("Authentication successful", credential);
  } catch (error) {
    console.error("Authentication failed", error);
  };
}


document.getElementById('registerButton')?.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  registerUser(username);
});

document.getElementById('loginButton')?.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  authenticateUser(username);
});

