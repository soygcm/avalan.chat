/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const webauthnFunctions = {};

webauthnFunctions.registerUser = onCall(async (request) => {
  const { username, credential } = request.data;
  if (!username || !credential) {
    throw new functions.https.HttpsError("invalid-argument", "Missing username or credential");
  }
  const userRef = db.collection("users").doc(username);
  const doc = await userRef.get();
  if (doc.exists) {
    throw new functions.https.HttpsError("already-exists", "User already exists");
  }
  await userRef.set({ credential });
  return { success: true };
});

webauthnFunctions.authenticateUser = onCall(async (request) => {
  const { username, clientDataJSON, authenticatorData } = request.data;
  if (!username || !clientDataJSON || !authenticatorData) {
    throw new functions.https.HttpsError("invalid-argument", "Missing username or authentication data");
  }
  const userRef = db.collection("users").doc(username);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", "User not found");
  }
  const storedCredential = doc.data().credential;
  return { success: true, storedCredential };
});

module.exports = webauthnFunctions;
