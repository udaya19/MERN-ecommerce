import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const option = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <div>
      <Link className="productCard" to={`/product/${product._id}`}>
        {/* <img src={product.images[0].url} alt="" /> */}
        <img
          src="https://d2j6dbq0eux0bg.cloudfront.net/images/9483337/3284475085.jpg"
          alt=""
        />
        <p>{product.name}</p>
        <div>
          <ReactStars {...option} /> <span>{product.numOfReviews} reviews</span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </div>
  );
};

export default ProductCard;
