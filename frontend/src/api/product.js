import apiInstance from ".";

export const getAllProducts = async () => {
  try {
    const response = apiInstance.get("/products/allProducts");
    return (await response).data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = apiInstance.post(`/get-product-by-id/${id}`);
    return (await response).data;
  } catch (error) {
    return error.response.data;
  }
};
