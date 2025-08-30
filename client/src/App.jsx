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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth/authSlice.js";
// import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <h1>Loading...</h1>;

  // console.log(`App isLoading : ${isLoading},     user : ${user}`);

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

      {/* <Routes>
        Public Routes
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="unauth-page" element={<UnAuthPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        Auth Routes
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<AuthLogin />} />
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        Protected Routes
        <Route
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        >
          Shopping Routes
          <Route path="/shop" element={<ShoppingLayout />}>
            <Route index element={<ShoppingHome />} />
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
          </Route>

          Admin Routes
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
