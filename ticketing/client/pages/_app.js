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
  let data;
  try {
    const response = await api.get("/api/users/currentuser");
    data = response.data;
  } catch {}

  let pageProps = {};

  if (Component.getInitialProps) {
    try {
      pageProps = await Component.getInitialProps();
    } catch {}
  }

  return { pageProps, ...data };
};

export default App;
