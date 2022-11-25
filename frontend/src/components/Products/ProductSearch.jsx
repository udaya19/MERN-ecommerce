import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchProduct } from "../../api/product";
import ProductCard from "../Home/ProductCard";

const ProductSearch = () => {
  const params = useParams();
  const keyword = params.keyword;
  const [resultData, setResultData] = useState([]);
  useEffect(() => {
    const productSearch = async () => {
      try {
        const resposne = await searchProduct(keyword);
        console.log(resposne);
        setResultData(resposne.products);
      } catch (error) {
        console.log(error);
      }
    };
    productSearch();
  }, [keyword]);
  return (
    <div>
      {resultData.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default ProductSearch;
