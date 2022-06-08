import { auth, firestore } from "./init";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {
    setDoc,
    getDoc,
    doc,
} from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

// Do that adding a user to the "users" database when registering.
// It's not yet needed (accounts are different than user ).
//export const addToUsers = async ()

// Copied verbatim from "tha source". 
export const logInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        const user = response.user;

        const q = doc(firestore, "users", user.uid);
        const docs = await getDoc(q);

        // We update the existing user if he signed it with a google account.
        if (!docs.exists()) {

            await setDoc(q, {
                name: user.displayName,
                authProvider: "google",
                email: user.email
            });
        }

    } catch (err) {
        console.error({err});
        alert(err.message);
    }
};


export const logout = () => {
    signOut(auth);
};
