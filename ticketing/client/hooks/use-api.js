import { useState } from "react";
import api from "../utils/api";

const useApi = ({ path, method = "get", body }) => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const doRequest = () => {
    setErrors(null);
    api()
      [method](path, body)
      .then(({ data }) => setData(data))
      .catch(({ response }) => setErrors(response.data.errors));
  };

  return [{ data, errors }, doRequest];
};

export { useApi };
