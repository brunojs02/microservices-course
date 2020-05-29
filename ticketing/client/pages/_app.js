import "bootstrap/dist/css/bootstrap.css";
import buildApi from "../utils/api";
import Navbar from "../components/Navbar";

const App = ({ Component, pageProps, currentUser }) => (
  <>
    <Navbar currentUser={currentUser} />
    <Component {...pageProps} currentUser={currentUser} />
  </>
);

App.getInitialProps = async ({ ctx, Component }) => {
  const api = buildApi(ctx);
  const { data } = await api.get("/api/users/currentuser");
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps();
  }

  return { pageProps, ...data };
};

export default App;
