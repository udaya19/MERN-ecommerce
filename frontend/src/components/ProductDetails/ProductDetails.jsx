import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../api/product";
import {
  getProductDetailsFail,
  getProductDetailsRequest,
  getProductDetailsSuccess,
} from "../../redux/productDetailsSlice";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { message } from "antd";
// import Loader from "../layout/Loader/Loader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const option = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return message.warning("Product limit reached");
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return message.warning("Product quantity cannot be less than 1");
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };
  useEffect(() => {
    const getDetailsOfProduct = async () => {
      try {
        dispatch(getProductDetailsRequest());
        const response = await getProductDetails(params.id);
        if (response.success) {
          message.success(response.message);
          dispatch(getProductDetailsSuccess(response.product));
        } else {
          message.error(response.error);
          dispatch(getProductDetailsFail());
        }
      } catch (err) {
        message.error(error.message);
        dispatch(getProductDetailsFail());
      }
    };
    getDetailsOfProduct();
  }, [dispatch, params, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      src={item.url}
                      key={item.url}
                      alt={`Slide ${i}`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...option} />
                <span>({product.numOfReviews} Review)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description:<p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map(
                  (review) => <ReviewCard review={review} />,
                  []
                )}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
