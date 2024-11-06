"use client";

import { initializeApp } from "firebase/app";
import {
  AuthErrorCodes,
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export interface UserType extends User {}

const firebaseConfig = {
  apiKey: "AIzaSyB55r468rIdrYgnwpK9hMqM7qoXE5Faq4I",
  authDomain: "food-ordering-app-4d5d2.firebaseapp.com",
  projectId: "food-ordering-app-4d5d2",
  storageBucket: "food-ordering-app-4d5d2.appspot.com",
  messagingSenderId: "823324329327",
  appId: "1:823324329327:web:30fc510935693b0216149a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const UseAuthProvider = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName });
      })
      .catch((e) => {
        if (e instanceof Error) {
          if (e.message.includes(AuthErrorCodes.EMAIL_EXISTS)) {
            throw new Error(
              "The email address is already in use by another account"
            );
          } else {
            throw new Error("something went wrong");
          }
        }
      });
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);

        localStorage.setItem(
          "user",
          JSON.stringify({ displayName: user.displayName, email: user.email })
        );
      })
      .catch((e) => {
        const error = e;
        console.log(error);
        if (e instanceof Error) {
          if (e.message.includes(AuthErrorCodes.INVALID_PASSWORD)) {
            throw new Error(
              "The password is invalid or the user does not have a password."
            );
          } else if (e.message.includes(AuthErrorCodes.TIMEOUT)) {
            throw new Error("The operation has timed out.");
          } else if (e.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
            throw new Error("The email address is badly formatted.");
          } else if (e.message === "auth/user-not-found") {
            throw new Error("user not found");
          }
        }
      });
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        setUser(user);
        localStorage.setItem(
          "user",
          JSON.stringify({ displayName: user.displayName, email: user.email })
        );
      })
      .catch((e) => {
        if (e instanceof Error) {
          if (e.message.includes(AuthErrorCodes.POPUP_CLOSED_BY_USER)) {
            throw new Error("Pop up closed BY user");
          } else if (e.message.includes(AuthErrorCodes.TIMEOUT)) {
            throw new Error("The operation has timed out.");
          } else if (e.message.includes(AuthErrorCodes.USER_CANCELLED)) {
            throw new Error(
              "The user did not grant your application the permissions it requested."
            );
          } else if (e.message.includes(AuthErrorCodes.POPUP_BLOCKED)) {
            throw new Error(
              "Unable to establish a connection with the popup. It may have been blocked by the browser."
            );
          } else {
            throw new Error("something went wrong");
          }
        }
      });
  };
  const signOutUser = () => {
    const result = signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .catch((error) => {
        return error;
      });
    return result;
  };

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        user ? setUser(user) : setUser(null);
      });
    };

    return () => {
      unsubscribe();
    };
  });
  return {
    user,
    signUp,
    signIn,
    signInWithGoogle,
    signOutUser,
  };
};
