// The Firebase Admin SDK to access Firestore.

import { HttpsError, onCall } from "firebase-functions/v2/https";
import { initializeApp, firestore } from "firebase-admin";
initializeApp();

const db = firestore();

const webauthnFunctions = {};

webauthnFunctions.registerUser = onCall(async (request) => {
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

webauthnFunctions.authenticateUser = onCall(async (request) => {
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

