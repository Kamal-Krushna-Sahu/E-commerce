import { NavLink } from "react-router-dom";

const ShoppingHome = () => {
  return (
    <div>
      <h1>ShoppingHome</h1>
      <NavLink to="/shop/listing">listing</NavLink>
    </div>
  );
};

export default ShoppingHome;
