import Router from "next/router";
import { useEffect } from "react";
import { useApi } from "../../../hooks/use-api";

const SignOut = () => {
  const [{ data }, logout] = useApi({
    path: "/api/users/signout",
    method: "post",
  });

  useEffect(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (data) Router.push("/");
  }, [data]);

  return <h1>You are singin out...</h1>;
};

export default SignOut;
