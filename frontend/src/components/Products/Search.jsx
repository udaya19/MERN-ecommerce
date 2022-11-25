import React, { useState } from "react";
import "./Search.css";
import { searchProduct } from "../../api/product";
import ProductCard from "../Home/ProductCard";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await searchProduct(keyword);
    console.log("Response", response);
    setResult(response.products);
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
        {result.length > 1 ? (
          <>
            <ProductCard product={result} />
          </>
        ) : (
          ""
        )}
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Search;
