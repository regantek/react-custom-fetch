import { useEffect, useReducer } from "react";

const initialState = {
  loading: "",
  error: "",
  data: [],
};
function apiReducer(state, action) {
  switch (action.type) {
    case "DATA_FETCH_START":
      return { ...state, loading: "yes" };
    case "DATA_FETCH_FAILURE":
      return { ...state, loading: "", error: action.payload };
    case "DATA_FETCH_SUCCESS":
      return { ...state, loading: "", data: action.payload };
    default:
      return state;
  }
}

function useFetch(endPoint) {
  const [data, dispatch] = useReducer(apiReducer, initialState);
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => setData(data));
  //   }, [url]);
  //   return data;

  useEffect(() => {
    dispatch({ type: "DATA_FETCH_START" });
    fetch(endPoint)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        dispatch({ type: "DATA_FETCH_SUCCESS", payload: json });
      })
      .catch((error) => {
        dispatch({ type: "DATA_FETCH_FAILURE", payload: error.message });
      });
  }, [endPoint]);
  return data;
}

export default useFetch;
