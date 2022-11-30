import apiInstance from ".";

export const loginUser = async (email, password) => {
  try {
    const response = await (
      await apiInstance.post("/users/login", { email, password })
    ).data;
    return response;
  } catch (error) {
    return error.response.data;
  }
};
