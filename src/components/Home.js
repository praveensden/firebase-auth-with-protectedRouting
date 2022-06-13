import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../context/UserAuthContext";
import { UserDataContext } from "../context/UserDataConext";
import UserData from "./UserData";
const Home = () => {
  const navigate = useNavigate();
  const { userDataFromDb } = useContext(UserDataContext);
  console.log(userDataFromDb);
  const { user, logout } = useContext(userAuthContext);
  const handleLogout = async () => {
    try {
      await logout();
      console.log("done");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="p-4 mt-3 text-center">
      <UserData />
      <div className="d-grid gap-2">
        <h2>Welcome {user && user.email}</h2>
        <Button className="primary" onClick={handleLogout}>
          Log Out
        </Button>
        {userDataFromDb &&
          userDataFromDb.map((user, key) => {
            return (
              <div key={key}>
                <p>{user.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
