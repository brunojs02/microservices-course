import axios from "axios";

const buildApi = (ctx = {}) => {
  const { req = {} } = ctx;
  const { headers } = req;

  if (typeof window === "undefined") {
    return axios.create({
      headers,
      // baseUrl: http://{deployment name}.{namespace}.svc.cluster.local
      baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    });
  } else {
    return axios.create({ baseURL: "/" });
  }
};

export default buildApi;
