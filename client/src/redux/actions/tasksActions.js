import { actions } from "../actionConstants";
import Axios from "axios";

export const fetchTasks = () => (dispatch) => {
  Axios({
    method: "GET",
    url: "/tasks",
  })
    .then((res) => {
      dispatch({
        type: actions.FETCH_TASKS,
        payload: res.data.tasks,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const addTask = (task) => {
  return {
    type: actions.ADD_TASK,
    payload: task,
  };
};
