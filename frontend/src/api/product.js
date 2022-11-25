import apiInstance from ".";

export const getAllProducts = async (keyword) => {
  try {
    const response = apiInstance.get(
      `/products/allProducts?keyword=${keyword}`
    );
    return (await response).data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = apiInstance.post(`/products/get-product-by-id/${id}`);
    return (await response).data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchProduct = async (keyword) => {
  try {
    const response = apiInstance.get(
      `/products/allProducts?keyword=${keyword}`
    );
    return (await response).data;
  } catch (error) {
    return error.response.data;
  }
};
