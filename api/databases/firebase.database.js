import firebaseAdmin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { deleteObject, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import JWT from 'jsonwebtoken';
import { FIREBASE_ADMIN_CONFIG, FIREBASE_APP_CONFIG, FIREBASE_DATABASE_URL } from '../constants/firebase.constant.js';


export const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(FIREBASE_ADMIN_CONFIG),
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: "gs://netflix-modify.appspot.com/"
});

export const app = initializeApp(FIREBASE_APP_CONFIG);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const upload = (buffer, path, metadata) => {
    const newRef = ref(storage, path);
    return uploadBytesResumable(newRef, buffer, metadata);
}

export const deleteFile = (path) => {
    const newRef = ref(storage, path);
    return deleteObject(newRef);
}

export const signIn = async (email, password) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const accessToken = await data.user.getIdToken();
    const uid = data.user.uid;

    return {
        userId: uid,
        accessToken,
    };
}

export const generateAccessToken = async (uid, custom) => {
    const customAccessToken = await generateToken(uid, custom);
    return customAccessToken;
}

export const generateToken = (uid, data) => {
    return admin.auth().createCustomToken(uid, data);
}

export const verifyToken = (token) => {
    return JWT.decode(token);
}

export const createUser = (email, password) => {
    return admin.auth().createUser({ email, password });
}

export const database = admin.database();