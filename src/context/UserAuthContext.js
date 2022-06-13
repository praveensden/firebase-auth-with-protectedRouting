import { Children, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
export const userAuthContext = createContext({});
const usersession = sessionStorage.getItem(
  "firebase:authUser:AIzaSyA4kqFDCIoO6vxwyfnOgozxOFSUgF8GmOI:[DEFAULT]"
);

export const UserAuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [checkUserSession, setCheckUserSession] = useState();
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        console.log("d");
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  function googleSignin() {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const logout = () => {
    sessionStorage.removeItem(
      "firebase:authUser:AIzaSyA4kqFDCIoO6vxwyfnOgozxOFSUgF8GmOI:[DEFAULT]"
    );
    return signOut(auth);
  };
  const value = { user, signUp, login, googleSignin, logout };
  useEffect(() => {
    setCheckUserSession(usersession);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser != null) {
        setUser(currentUser);
        if (usersession) {
          navigate("/home");
        } else {
          navigate("/");
        }
      }
      return () => {
        unsubscribe();
      };
    });
  }, []);
  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};
