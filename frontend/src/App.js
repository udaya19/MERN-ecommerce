import "./App.css";
import Header from "./components/layout/Header/Header";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
