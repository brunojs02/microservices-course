import axios from "axios";
import { useState } from "react";

const useApi = ({ path, method = "get", body }) => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const doRequest = () => {
    setErrors(null);
    axios[method](path, body)
      .then(({ data }) => setData(data))
      .catch(({ response }) => setErrors(response.data.errors));
  };

  return [{ data, errors }, doRequest];
};

export { useApi };
