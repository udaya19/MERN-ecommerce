import "./App.css";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
