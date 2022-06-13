import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { db } from "../firebase";
import { onValue, push, ref } from "firebase/database";

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
export const UserDataContext = createContext({
  userData: null,
  setUserData: () => {},
});
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [savingUserKey, setSavinguserKey] = useState();
  const [userDataFromDb, setUserDataFromDb] = useState([]);
  const { name, profession } = userData;
  async function saveUserToDb() {
    await push(ref(db, "Users"), {
      name,
      profession,
    }).then((snap) => {
      setSavinguserKey(snap.key);
    });
  }
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        async function getUserFromDb() {
          let users = [];
          await onValue(ref(db, "Users/"), (snapshot) => {
            const data = snapshot.val();
            Object.keys(data).map((u) => {
              const finalUserFromDb = {
                id: u,
                name: data[u].name,
                profession: data[u].profession,
              };
              users.push(finalUserFromDb);
            });
            setUserDataFromDb(users);
          });
        }
        getUserFromDb();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }, []);
  const value = {
    userData,
    setUserData,
    saveUserToDb,
    // getUserFromDb,
    userDataFromDb,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
