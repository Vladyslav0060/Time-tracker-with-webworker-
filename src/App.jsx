import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GuardRoute from "./Components/GuardRoute";
import Home from "./Components/Home";
import Activities from "./Components/Activities";
import Settings from "./Components/Settings";
import Login from "./Components/Login";
import { useDispatch, useSelector } from "react-redux";
import { actionType } from "./store/store";
import ListActivities from "./Components/ListActivities";
const axios = require("axios");

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  console.log("ISLOGGED", isLoggedIn);
  useEffect(() => {
    let getFromLocalStorage = async () => {
      console.log("got it");
      const token = await localStorage.getItem("token");
      return axios({
        method: "post",
        url: "http://localhost:8080/api/decodetoken",
        data: { token },
      })
        .then(function (response) {
          console.log("response", response.data);
          dispatch({ type: actionType.TOGGLE_LOGIN });
          dispatch({ type: actionType.SET_USERDATA, payload: response.data });
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    if (localStorage.getItem("token")) getFromLocalStorage();
  }, [dispatch]); //хз нужно ли

  return (
    <Router>
      <div className="navigation">
        <ul>
          <li className="list active">
            <b></b>
            <b></b>
            <Link to="/">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Home</span>
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="list">
              <b></b>
              <b></b>
              <Link to="/activities">
                <span className="icon">
                  <ion-icon name="stopwatch-outline"></ion-icon>
                </span>
                <span className="title">Activities</span>
              </Link>
            </li>
          ) : (
            // <BarComponent liClassName="list" linkTo="/activities" iconName="stopwatch-outline" spanTitleName="title"/>
            <></>
          )}
          {isLoggedIn ? (
            <li className="list">
              <b></b>
              <b></b>
              <Link to="/listactivities">
                <span className="icon">
                  <ion-icon name="list-outline"></ion-icon>
                </span>
                <span className="title">List</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <li className="list">
              <b></b>
              <b></b>
              <Link to="/settings">
                <span className="icon">
                  <ion-icon name="cog-outline"></ion-icon>
                </span>
                <span className="title">Settings</span>
              </Link>
            </li>
          ) : (
            <></>
          )}

          {isLoggedIn ? (
            <li className="list">
              <b></b>
              <b></b>
              <a href="/login">
                <span className="icon">
                  <ion-icon
                    onClick={() => {
                      console.log("Log out");
                      localStorage.clear();
                      dispatch({ type: actionType.TOGGLE_LOGIN });
                    }}
                    name="log-out-outline"
                  ></ion-icon>
                </span>
                <span className="title">Log out</span>
              </a>
            </li>
          ) : (
            <li className="list">
              <b></b>
              <b></b>
              <Link to="/login">
                <span className="icon">
                  <ion-icon name="log-in-outline"></ion-icon>
                </span>
                <span className="title">Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <GuardRoute exact path="/listactivities" component={ListActivities}>
          <span className="icon"></span>
          <ListActivities />
        </GuardRoute>
        <GuardRoute exact path="/activities" component={Activities}>
          <span className="icon"></span>
          <Activities />
        </GuardRoute>
        <GuardRoute exact path="/settings" component={Settings}>
          <span className="icon"></span>
          <Settings />
        </GuardRoute>
        <Route exact path="/login">
          <span className="icon"></span>
          <Login />
        </Route>
      </Switch>
      <div className="toggle">
        <ion-icon name="menu-outline" className="open"></ion-icon>
        {/* <ion-icon name="close-outline" className="close"></ion-icon>  */}
      </div>
    </Router>
  );
}

export default App;
