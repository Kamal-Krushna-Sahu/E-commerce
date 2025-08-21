import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout.jsx";
import AuthLogin from "./pages/auth/AuthLogin.jsx";
import AuthRegister from "./pages/auth/AuthRegister.jsx";
import AdminLayout from "./components/admin-view/AdminLayout.jsx";
import AdminDashboard from "./pages/admin-view/AdminDashboard.jsx";
import AdminProducts from "./pages/admin-view/AdminProducts.jsx";
import AdminOrders from "./pages/admin-view/AdminOrders.jsx";
import AdminFeatures from "./pages/admin-view/AdminFeatures.jsx";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout.jsx";
import ShoppingHome from "./pages/shopping-view/ShoppingHome.jsx";
import ShoppingListing from "./pages/shopping-view/ShoppingListing.jsx";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout.jsx";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount.jsx";
import PageNotFound from "./pages/not-found/PageNotFound.jsx";
import UnAuthPage from "./pages/unauth-page/UnAuthPage.jsx";
import CheckAuth from "./components/common/CheckAuth.jsx";

function App() {
  const isAuthenticated = false;
  const user = {
    name: "Bads",
    role: "user",
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
