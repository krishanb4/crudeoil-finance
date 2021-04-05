import apiRequest from "../helpers/apiRequest";
import axios from "axios";

export const getUsersWithFilters = async (pageNo, pageSize) => {
  try {
    const requestOptions = {
      method: "GET",
      baseURL: process.env.API_URL,
      url: "/User/ListPage",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Basic cGxhbm83NDp0ZXN0",
      },
      params: {
        pageindex: pageNo,
        pagesize: pageSize,
      },
    };
    console.log('called API CALL ');
    const res = await axios(requestOptions);
    console.log('RESPONSE getUsers ');
    return res.data;
  } catch (error) {
    throw error.data;
  }
};

export const getAllUsers = async () => {
  const requestOptions = {
    method: "GET",
    url: "/User/GetAll",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Basic: "cGxhbm83NDp0ZXN0",
    },
  };

  try {
    const res = await apiRequest(requestOptions);
    return res.data;
  } catch (error) {
    throw error.data;
  }
};
