import axios from "axios";
const Axios = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
};

export default Axios;