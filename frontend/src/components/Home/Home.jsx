import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../api/product";
import {
  getProductsFail,
  getProductsRequest,
  getProductsSuccess,
} from "../../redux/productSlice";
import MetaData from "../layout/MetaData";
import "./Home.css";
import Product from "./Product";

const Home = () => {
  //{
  // url: "data:image/jpeg;base64,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",
  //},
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  useEffect(() => {
    const getProductInfo = async () => {
      try {
        dispatch(getProductsRequest());
        const response = await getAllProducts();
        dispatch(getProductsSuccess(response.products));
        console.log(response.products);
      } catch (err) {
        console.log(error);
        dispatch(getProductsFail(error.message));
      }
    };
    getProductInfo();
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <div>
          <MetaData title="E-commerce" />
          <div className="banner">
            <p>Welcome to E-commerce</p>
            <h1>Find amazind products below</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
