import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const axios = require("axios");
const ListActivities = () => {
  const username = useSelector((store) => store.userData.username) || "";
  let [activities, setActivities] = useState([]);
  const userData = useSelector((store) => store.userData);

  useEffect(() => {
    let makeRequest = async () => {
      try {
        console.log(username);
        const test = await axios.get(
          `http://localhost:8080/timer/activity/${userData.id}`,
          {
            params: { username: username },
          }
        );
        setActivities(test.data.result);
        console.log(test.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [username, userData.id]);
  return (
    <div className="wrapper">
      <div className="content">
        <h1>List of activities</h1>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Time</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx = 0) => (
            //   <p key={Math.random()}>{activity.activity_name}</p>
            <tr key={Math.random()}>
              <th scope="row">{++idx}</th>
              <td>{activity.activity_name}</td>
              <td>{activity.activity_time}</td>
              <td>{activity.activity_created.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListActivities;
