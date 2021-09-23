import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

const axios = require("axios");
const ListActivities = () => {
  const store = useSelector((store) => store);
  let [activities, setActivities] = useState([]);
  let [editModeEnabled, setEditModeEnabled] = useState(false);
  let makeRequest = useCallback(async () => {
    try {
      console.log(store.userData.username);
      const test = await axios.get(
        `http://localhost:8080/timer/activity/${store.userData.id}`,
        {
          params: { username: store.userData.username },
        }
      );
      setActivities(test.data.result);
      console.log(test.data.result);
    } catch (error) {
      console.log(error);
    }
  }, [store.userData.id, store.userData.username]);
  const removeActionViaDbId = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/timer/activity/${id}`, {
        params: { id: id },
      });
      makeRequest();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makeRequest();
  }, [store.userData.username, store.userData.id, makeRequest]);

  return (
    <div className="wrapper">
      <div className="content">
        <div className="floatcontainer">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={editModeEnabled}
              onChange={() => {
                setEditModeEnabled(!editModeEnabled);
              }}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Edit mode {editModeEnabled ? "enabled" : "disabled"}
            </label>
          </div>
        </div>
        {/* <h1>List of activities</h1> */}
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">HH:MM:SS</th>
              {/* <th scope="col">Remove</th> */}
              {editModeEnabled ? (
                <th scope="col" style={{ width: "5%" }}>
                  Remove
                </th>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx = 0) => (
              //   <p key={Math.random()}>{activity.activity_name}</p>
              <tr key={activity.activity_id}>
                <th scope="row">{++idx}</th>
                <td>{activity.activity_name}</td>
                <td>{activity.activity_time}</td>
                <td>{activity.activity_created.split("T")[0]} </td>
                <td>{activity.activity_created.split("T")[1].split(".")[0]}</td>
                {editModeEnabled ? (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm modified"
                      onClick={() => {
                        removeActionViaDbId(activity.activity_id);
                      }}
                    >
                      <span className="icon">
                        {/* <ion-icon name="close-outline"></ion-icon> */}
                        Remove
                      </span>
                    </button>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListActivities;
