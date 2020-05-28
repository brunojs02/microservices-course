import api from "../utils/api";

const Index = ({ currentUser }) => (
  <>
    <h1>Welcome to next</h1>
    <p>{JSON.stringify(currentUser)}</p>
  </>
);

Index.getInitialProps = async (ctx) => {
  const { data } = await api(ctx).get("/api/users/currentuser");

  return data;
};

export default Index;
