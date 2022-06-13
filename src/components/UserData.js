import { db } from "../firebase";
import { push, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserDataContext } from "../context/UserDataConext";
import { async } from "@firebase/util";

const UserData = () => {
  const { userData, setUserData, saveUserToDb, getUserFromDb } =
    useContext(UserDataContext);
  const onChangeGetData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveUserToDb();
    // getUserFromDb();
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Send User Data</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="name"
              type="text"
              placeholder="fullname"
              onChange={onChangeGetData}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              name="profession"
              type="text"
              placeholder="profession"
              onChange={onChangeGetData}
            ></Form.Control>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Save User Data
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UserData;
