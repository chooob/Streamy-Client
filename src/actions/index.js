import streams from "../apis/streams";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
//create new stream
export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });

    dispatch({ type: "CREATE_STREAM", payload: response.data });
    history.push("/");
  };
};
//get all stream
export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await streams.get("/streams");

    dispatch({ type: "FETCH_STREAMS", payload: response.data });
  };
};
//get one stream
export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get("/streams/" + id);

    dispatch({ type: "FETCH_STREAM", payload: response.data });
  };
};
//edit one stream
export const editStream = (id, value) => {
  return async (dispatch) => {
    const response = await streams.patch("/streams/" + id, value);

    dispatch({ type: "EDIT_STREAM", payload: response.data });
    history.push("/");
  };
};
//delete specified stream
export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete("/streams/" + id);
    dispatch({ type: "DELETE_STREAM", payload: id });
    history.push("/");
  };
};
