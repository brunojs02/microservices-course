import axios from "axios";

export default (ctx = {}) => {
  const { req = {} } = ctx;
  const { headers } = req;

  if (typeof window === "undefined") {
    return axios.create({
      headers,
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    });
  } else {
    return axios.create({ baseURL: "/" });
  }
};
