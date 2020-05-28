import { useState, useEffect } from "react";
import Router from "next/router";
import { useApi } from "../../../hooks/use-api";
import ErrorMessage from "../../../components/ErrorMessage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ data, errors }, doRequest] = useApi({
    path: "/api/users/signup",
    method: "post",
    body: { email, password },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  useEffect(() => {
    if (data) Router.push("/");
  }, [data]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4 col-sm-12">
          <form onSubmit={onSubmit}>
            <h2>Sign Up</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <ErrorMessage errors={errors} />
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
