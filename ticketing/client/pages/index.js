import Head from "next/head";
import api from "../utils/api";

const Index = ({ currentUser }) => (
  <>
    <Head>
      <title>Ticketing</title>
    </Head>
    <h1>{currentUser ? "You are logged in" : "You are not logged in"}</h1>
  </>
);

Index.getInitialProps = async (ctx) => {
  const { data } = await api(ctx).get("/api/users/currentuser");

  return data;
};

export default Index;
