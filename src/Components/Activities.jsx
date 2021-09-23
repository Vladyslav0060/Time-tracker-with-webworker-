import { actionType } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Timer from "./Timer";
import ListActivities from "./ListActivities";
const axios = require("axios");

const Activities = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  useEffect(() => {
    let getActivitiesDistinct = async () => {
      try {
        console.log(store.userData.id);
        const test = await axios.get(
          `http://localhost:8080/timer/activity-distinct/${store.userData.id}`,
          {
            params: { username: store.userData.username },
          }
        );
        console.log(test.data.result);
        dispatch({
          type: actionType.SET_ACTIVITIES_DISTINCT,
          payload: test.data.result,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getActivitiesDistinct();
  }, [store.userData.username, store.userData.id, dispatch]);
  return (
    <div className="content">
      {/* <h1>Create activity</h1> */}
      <Timer />
      <div
        style={{
          width: "100%",
          textAlign: "center",
          paddingLeft: "6rem",
        }}
      >
        <h2 style={{ marginTop: "20px" }}>Your activities</h2>
      </div>

      <ListActivities />
    </div>
  );
};

export default Activities;
