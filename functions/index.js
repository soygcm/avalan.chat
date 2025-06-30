// The Firebase Admin SDK to access Firestore.

import { onCall } from "firebase-functions/v2/https";
import * as functions from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
initializeApp();

const db = firestore();

const webauthnFunctions = {};

webauthnFunctions.registerUser = onCall(async (request) => {
  const { username, credential } = request.data; // Assuming the request data is nested under 'data'
  if (!username || !credential) {
    throw new onCall.HttpsError("invalid-argument", "Missing username or credential");
  }
  const userRef = db.collection("users").doc(username);
  const doc = await userRef.get();
  if (doc.exists) {
    throw new onCall.HttpsError("already-exists", "User already exists");
  }
  await userRef.set({ credential });
  return { success: true };
});

webauthnFunctions.authenticateUser = onCall(async (request) => {
  const { username, clientDataJSON, authenticatorData } = request.data;
  if (!username || !clientDataJSON || !authenticatorData) {
    throw new onCall.HttpsError("invalid-argument", "Missing username or authentication data");
  }
  const userRef = db.collection("users").doc(username);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", "User not found");
  }
  const storedCredential = doc.data().credential;
  return { success: true, storedCredential };
});

export default { webauthnFunctions };

