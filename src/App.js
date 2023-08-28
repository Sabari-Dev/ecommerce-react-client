import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/:userId/product/:id" element={<ProductDetails />} />
          <Route path="/cart/:id" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
