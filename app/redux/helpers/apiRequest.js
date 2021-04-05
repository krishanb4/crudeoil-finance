import axios from "axios";

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: process.env.API_URL,
});

/**
 * Request Wrapper with default success/error actions
 */
const request = async function(options) {
  const onSuccess = function(response) {
    return response;
  };

  const onError = function(error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      if (process.env.NODE_ENV === "development") {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      if (process.env.NODE_ENV === "development") {
        console.error("Error Message:", error.message);
      }
    }

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
