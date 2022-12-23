import apiInstance from ".";

export const addProductToCart = async (productQuantity, id) => {
  try {
    const response = await (
      await apiInstance.post(`/cart/add-to-cart/${id}`, { productQuantity })
    ).data;
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteProductFromCart = async (id) => {
  try {
    const response = await (
      await apiInstance.post(`/cart/delete-from-cart/${id}`)
    ).data;
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserCart = async () => {
  try {
    const response = await (await apiInstance.get("/cart/user-cart")).data;
    return response;
  } catch (error) {
    return error;
  }
};
