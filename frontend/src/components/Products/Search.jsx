import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
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
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Search;
