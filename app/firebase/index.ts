import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
const apps = getApps();
const app = apps.length
  ? apps[0]
  : initializeApp({
      projectId: "amrdiab-64119",
      credential: cert({
        projectId: "amrdiab-64119",
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
      }),
    });
export const db = getFirestore(app);
