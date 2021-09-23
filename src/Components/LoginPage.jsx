import { Button, Form } from "react-bootstrap";
import styles from "../CssModules/Login.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionType } from "../store/store";

const axios = require("axios");
const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  // const [registrationToggle,setRegistrationToggle] = useState(false)
  const onSubmit = (e) => {
    login();
    e.preventDefault();
  };
  const togglePage = () => {
    dispatch({ type: actionType.TOGGLE_LOGIN_PAGE });
  };
  let getFromLocalStorage = async () => {
    let result = {};
    console.log("got it");
    const token = await localStorage.getItem("token");
    return axios({
      method: "post",
      url: "http://localhost:8080/api/decodetoken",
      data: { token },
    })
      .then(async function (response) {
        result = await response.data;
      })
      .then(function () {
        return result;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  let login = async () => {
    let body = {
      username: username,
      email: email,
      password: password,
    };
    if (localStorage.getItem("token") !== null) {
      console.log("popavs");
      const temp = await getFromLocalStorage();
      const { username, email, password, userID } = temp;
      body = { username, email, password, userID };
      return;
    }
    console.log("booody", body);
    axios({
      method: "post",
      url: "http://localhost:8080/api/login",
      data: body,
    })
      .then(async function (response) {
        console.log("response: ", response);
        localStorage.setItem("token", response.data.accessToken);
        const temp = await getFromLocalStorage();
        const { id } = temp;
        body.id = id;
        console.log(`Welcome,${body.username},${body.email}`);
        console.log("body", body);
        console.log("accessToken", response.data.accessToken);
        dispatch({ type: actionType.TOGGLE_LOGIN });
        dispatch({ type: actionType.SET_USERDATA, payload: body });
      })
      .catch(function (err) {
        console.log(err);
        // alert("try again");
      });
  };
  return (
    <div>
      <h1 className={styles.title}>Login page</h1>

      <div className={styles.wrapper}>
        <div className={styles.content}>
          {/* <Button variant="success">Success</Button>{" "} */}
          <Form className={styles.form}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={onChangeUsername}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={onChangeEmail}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              {/* <Form.Check type="checkbox" label="Check me out" /> */}
            </Form.Group>
            <div className={styles.buttonGroup}>
              <Button
                variant="success"
                size="m"
                type="submit"
                onClick={onSubmit}
              >
                Login
              </Button>
              <Button
                variant="outline-info"
                className={styles.outlineButton}
                size="sm"
                onClick={togglePage}
              >
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
