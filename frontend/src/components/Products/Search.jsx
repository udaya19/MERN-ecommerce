import React, { useState } from "react";
import "./Search.css";
// import { searchProduct } from "../../api/product";
// import ProductCard from "../Home/ProductCard";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  // const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    if (keyword.trim()) navigate(`/products/${keyword}`);
    else navigate("/products");
  };
  return (
    <div>
      <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        {/* {result.length > 1 ? (
          <>
            <ProductCard product={result} />
          </>
        ) : (
          ""
        )} */}
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Search;
