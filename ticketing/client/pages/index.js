import Head from "next/head";

const Index = ({ currentUser }) => (
  <>
    <Head>
      <title>Ticketing</title>
    </Head>
    <h1>{currentUser ? "You are logged in" : "You are not logged in"}</h1>
  </>
);

export default Index;
