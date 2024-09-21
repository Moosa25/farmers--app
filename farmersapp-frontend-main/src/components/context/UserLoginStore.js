import React, { useState } from 'react';
import { loginContext } from './loginContext';
import axios from 'axios';

function UserLoginStore({ children }) {
  let [err, setErr] = useState("");
  let [currentUser, setCurrentUser] = useState("");
  let [loginErr, setLoginErr] = useState("");
  let [userloginStatus, setUserLoginStatus] = useState(false);
  let [username, setUsername] = useState("");

  const loginUser = (userCredentialsObj) => {
    console.log(userCredentialsObj);
    axios.post("https://farmersapp-backend-d740c4e55b12.herokuapp.com/efarmers/credentials", userCredentialsObj).then(response => {
      if (response.data.success === true) {
        localStorage.setItem("token", response.data.token);
        setCurrentUser(response.data.user);
        setLoginErr("");
        setUserLoginStatus(true);
        setUsername(response.data.username);
      } else {
        setLoginErr(response.data.message);
      }
    }).catch(err => {
        setLoginErr(true);
      console.log("err in user login", err);
    });
  };

  const logoutUser = () => {
    localStorage.clear();
    setUserLoginStatus(false);
    setCurrentUser("");
  };

  return (
    <loginContext.Provider value={[currentUser, loginErr, userloginStatus, loginUser, username, logoutUser]}>
      {children}
    </loginContext.Provider>
  );
}

export default UserLoginStore;
