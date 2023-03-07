import type { NextPage } from "next";
import Navbar from "@/components/NavBar";
import Footer from "../Footer";
import React, { createContext, useEffect, useState } from "react";
import firebaseApp from "@/service/firebase";
import {
  getAuth,
  updateProfile,
  FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";
import { RandomAvatar } from "@/utils/avatar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const userContext = createContext({});
const Layout = ({ children }: Props) => {
  const newAvatar = RandomAvatar();
  const auth = getAuth(firebaseApp);

  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log(
        "🚀 ~ file: index.tsx:35 ~ useEffect ~ currentUser:",
        currentUser
      );
      if (!currentUser.photoURL) {
        setCurrentUser({ ...currentUser, photoURL: newAvatar });
        const user = auth.currentUser;
        updateProfile(user, { photoURL: newAvatar });
      }
    }
  });
  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </userContext.Provider>
  );
};

export default Layout;
