import apiRequest from "../helpers/apiRequest";

export const getStoreCustomTimeSlotsWithFilters = async (pageNo, pageSize) => {
  const requestOptions = {
    method: "GET",
    url: "/OSTimeSlotCustom/ListPage",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Basic cGxhbm83NDp0ZXN0",
    },
    params: {
      pageindex: pageNo,
      pagesize: pageSize,
    },
  };

  try {
    const res = await apiRequest(requestOptions);
    return res.data;
  } catch (error) {
    throw error.data;
  }
};

export const getStoreCustomTimeSlots = async () => {
  const requestOptions = {
    method: "GET",
    url: "/OSTimeSlotCustom/GetAll",
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
