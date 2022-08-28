import Navbar from "./components/Navbar.js";
import Carousel from "./components/Carousel";
import Product from "./components/Products";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FilterProduct from './components/FilterProduct';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AppState from "./contextApi/AppState.js";
import Productdetail from "./components/Productdetail.js";
import Profile from "./components/Profile"
import UpdateImage from "./components/UpdateImage"
import UpdatePassword from "./components/UpdatePassword"
import UpdateProfile from "./components/UpdateProfile"
import Email from "./components/Email"
import Password from "./components/Password"
import Cart from "./components/Cart"
import ShippingInfo from "./components/ShippingInfo.js";
import ConfirmOrder from "./components/ConfirmOrder.js";
import Payment from "./components/Payment.js";
import Order from "./components/Order.js";
import Dashboard from "./components/Dashboard"
import Allorders from "./components/Allorders";
import Allreviews from "./components/Allreviews";
import Allusers from "./components/Allusers";
import Allproducts from "./components/Allproducts";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
function App() {
  return (
    <Router>
      <AppState>
    <Navbar />
    <Routes>
      <Route  exact path="/product" element={<FilterProduct/>}></Route>
      <Route  exact path="/" element={<><Carousel /><Product /></>}></Route>
      <Route  exact path="/productdetail/:id" element={<Productdetail/>}></Route>
      <Route  exact path="/loginPage" element={<Login/>}></Route>
      <Route  exact path="/signupPage" element={<SignUp/>}></Route>
      <Route  exact path="/profile" element={<Profile/>}></Route>
      <Route  exact path="/updateImage" element={<UpdateImage/>}></Route>
      <Route  exact path="/updatePassword" element={<UpdatePassword/>}></Route>
      <Route  exact path="/updateProfileInfo" element={<UpdateProfile/>}></Route>
      <Route  exact path="/changePassword/:token" element={<Password/>}></Route>
      <Route  exact path="/enterEmail" element={<Email/>}></Route>
      <Route  exact path="/cart" element={<Cart/>}></Route>
      <Route  exact path="/shippingInfo" element={<ShippingInfo/>}></Route>
      <Route  exact path="/confirmOrder" element={<ConfirmOrder/>}></Route>
      <Route  exact path="/payment" element={<Payment />}></Route>
      <Route  exact path="/myorder" element={<Order />}></Route>
      <Route  exact path="/admin/dashboard" element={<Dashboard />}></Route>
      <Route  exact path="/admin/allorders" element={<Allorders />}></Route>
      <Route  exact path="/admin/allusers" element={<Allusers />}></Route>
      <Route  exact path="/admin/allreviews/:id" element={<Allreviews />}></Route>
      <Route  exact path="/admin/allproducts" element={<Allproducts />}></Route>
      <Route  exact path="/admin/addProduct" element={<AddProduct />}></Route>
      <Route  exact path="/admin/editProduct/:id" element={<EditProduct />}></Route>
    </Routes>
    <Footer />
    </AppState>
    </Router>
  );
}

export default App;
