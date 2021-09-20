import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardRoute = (props) => {
  return (
    <Route
      path={props.path}
      render={(data) =>
        localStorage.getItem("token")?.length > 0 ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/login" }}></Redirect>
        )
      }
    >
      {/* {alert('You need to log in')} */}
    </Route>
  );
};

export default GuardRoute;
