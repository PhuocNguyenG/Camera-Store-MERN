import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Navbar } from "./components/Navbar/index";
// import { Home, Products, About, Product, Cart } from "./pages";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { About } from "./pages/about";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { UpdateProduct } from "./components/Product/ProdModal/update";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/thong-tin" element={<About />} />
        <Route path="/san-pham/:id" element={<Product />} />
        <Route path="/san-pham/cap-nhat/:id" element={<UpdateProduct />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Switch>
    </Router>
  );
}

export default App;
