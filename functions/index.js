import { HttpsError, onCall } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
initializeApp();

const db = getFirestore();

const webauthnFunctions = {};

webauthnFunctions.getRegistrationOptions = onCall(async (request) => {
 return { options: 'placeholder' };
});

webauthnFunctions.getAuthenticationOptions = onCall(async (request) => {
 const { username } = request.data;
  if (!username) {
    throw new HttpsError("invalid-argument",
      `Missing username.`);
  }
 return { options: 'placeholder' };
});

webauthnFunctions.registerUser = onCall(async (request) => {
  // This function's original name was verifyRegistration.
  // It receives the credential created on the client side and stores it.
  // The name is changed to registerUser to better reflect its purpose
  // in the overall registration flow.
  console.log(request);
  const { username, credential } = request.data;
  if (!username || !credential) {
    throw new HttpsError("invalid-argument",
      `Missing username or authentication data.\
      actual data is: ${JSON.stringify(request.data)}`);
  }
  const userRef = db.collection("users").doc(username);
  const doc = await userRef.get();
  if (doc.exists) {
    throw new HttpsError("already-exists",
      `User '${username}' already exists`);
  }
  await userRef.set({ credential });
  return { success: true };
});

webauthnFunctions.verifyAuthentication = onCall(async (request) => {
  // This function's original name was authenticateUser.
  // It receives the authentication data from the client side and retrieves the stored credential.
  // The name is changed to verifyAuthentication to better reflect its purpose
  // in the overall authentication flow.
  const {
    username,
    clientDataJSON,
    authenticatorData,
  } = request.data;
  if (!username || !clientDataJSON || !authenticatorData) {
    throw new HttpsError("invalid-argument",
      `Missing username or authentication data. \
       actual data is: ${JSON.stringify(request.data)}`);
  }
  const userRef = db.collection("users").doc(username);
  const doc = await userRef.get();
  if (!doc || !doc.exists) {
    throw new HttpsError("not-found",
      `User '${username}' not found.`);
  }
  const storedCredential = doc.data()?.credential;

  if (!storedCredential) {
    throw new HttpsError("not-found",
      `Credential for ${username} not found inside data()`);
  }
  return { success: true, storedCredential };
});

export default { webauthnFunctions };

