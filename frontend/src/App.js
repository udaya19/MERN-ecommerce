import "./App.css";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import Search from "./components/Products/Search";
import ProductSearch from "./components/Products/ProductSearch";
import LoginSignUp from "./components/User/LoginSignUp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserRequest, loadUserSuccess } from "./redux/loadUser";
import { loadUser } from "./api/user";

function App() {
  const { isAuthenticated } = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(loadUserRequest());
        const response = await loadUser();
        dispatch(loadUserSuccess(response));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <LoginSignUp />}
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:keyword" element={<ProductSearch />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Home /> : <LoginSignUp />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
