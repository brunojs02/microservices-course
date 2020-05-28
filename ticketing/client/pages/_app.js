import "bootstrap/dist/css/bootstrap.css";
import buildApi from "../utils/api";

const App = ({ Component, pageProps, currentUser }) => (
  <>
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
