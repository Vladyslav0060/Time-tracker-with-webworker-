import React from "react";
import LoginPage from "./LoginPage";
import Registration from "./Registration";
import { useSelector } from "react-redux";
const Login = () => {
  // let [reg, setReg] = useState(true);
  let toggle_login_page = useSelector((store) => store.toggle_login_page);
  return (
    <div>
      {toggle_login_page ? <LoginPage /> : <Registration />}
      {/* <LoginPage />
      <Registration /> */}
    </div>
  );
};

export default Login;
