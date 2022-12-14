import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { getAllProducts } from "../../api/product";
import {
  getProductsFail,
  getProductsRequest,
  getProductsSuccess,
} from "../../redux/productSlice";
import { message } from "antd";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
const Products = () => {
  const { loading, error, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        dispatch(getProductsRequest());
        const response = await getAllProducts();
        if (response.success) {
          dispatch(getProductsSuccess(response.products));
          message.success(response.message);
        } else {
          message.error(response.error);
          dispatch(getProductsFail(response.error));
        }
      } catch (err) {
        message.error(error.message);
        dispatch(getProductsFail(error.message));
      }
    };
    fetchAllProducts();
  }, [dispatch, error]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products..." />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
