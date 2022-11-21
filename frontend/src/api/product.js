import apiInstance from ".";

export const getAllProducts = async () => {
  try {
    const response = apiInstance.get("/products/allProducts");
    return (await response).data;
  } catch (error) {
    return error.response.data;
  }
};
