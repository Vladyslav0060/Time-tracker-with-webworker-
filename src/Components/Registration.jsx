import { Button, Form } from "react-bootstrap";
import styles from "../CssModules/Login.module.css";
import { useDispatch } from "react-redux";
import { actionType } from "../store/store";
import React, { useState } from "react";
const axios = require("axios");
const Registration = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
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
    localStorage.clear();
    register();
    e.preventDefault();
  };
  const togglePage = () => {
    dispatch({ type: actionType.TOGGLE_LOGIN_PAGE });
  };
  let register = async () => {
    try {
      let body = { username: username, email: email, password: password };
      localStorage.setItem(
        "token",
        await axios.post(`http://localhost:8080/api/register`, body)
      );
      togglePage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Regitration page</h1>
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
              <Form.Check type="checkbox" label="I agree with all terms" />
            </Form.Group>
            <div className={styles.buttonGroup}>
              <Button
                variant="success"
                size="m"
                type="submit"
                onClick={onSubmit}
                disabled={!checkbox}
              >
                Register
              </Button>
              <Button
                variant="outline-info"
                className={styles.outlineButton}
                size="sm"
                onClick={togglePage}
              >
                Login page
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
