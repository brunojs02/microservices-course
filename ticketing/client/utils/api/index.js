import axios from "axios";

const buildApi = (ctx = {}) => {
  const { req = {} } = ctx;
  const { headers } = req;

  if (typeof window === "undefined") {
    return axios.create({
      headers,
      baseURL: "http://ingress-nginx-controller.kube-system.svc.cluster.local",
    });
  } else {
    return axios.create({ baseURL: "/" });
  }
};

export default buildApi;
