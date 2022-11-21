import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch } from "react-redux";
import { getProductDetails } from "../../api/product";
import {
  getProductDetailsRequest,
  getProductDetailsSuccess,
} from "../../redux/productDetailsSlice";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const getDetailsOfProduct = async () => {
      try {
        dispatch(getProductDetailsRequest());
        const response = await getProductDetails(params.id);
        dispatch(getProductDetailsSuccess(response.product));
      } catch (err) {
        console.log(err);
      }
    };
    getDetailsOfProduct();
  }, [dispatch, params]);
  return (
    <div>
      <div className="ProductDetails">
        <div>
          <Carousel></Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
