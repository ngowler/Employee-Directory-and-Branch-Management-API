import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../firebase-service-account.ci.json";

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export default db;
