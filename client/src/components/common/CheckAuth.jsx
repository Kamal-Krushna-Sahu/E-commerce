import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // console.log(
  //   `CheckAuth location.pathname : ${location.pathname},     isAuthenticated : ${isAuthenticated}`
  // );
  // console.log("======================");

  // // check if authenticated, then redirect according to "role"
  // if (location.pathname === "/") {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" />;
  //   } else {
  //     if (user?.role === "admin") {
  //       return <Navigate to="/admin/dashboard" />;
  //     } else {
  //       return <Navigate to="/shop/home" />;
  //     }
  //   }
  // }

  // // check if not authenticated and tries to access the "shop" or "admin" page
  // if (
  //   !isAuthenticated &&
  //   !(
  //     location.pathname.includes("/login") ||
  //     location.pathname.includes("/register")
  //   )
  // ) {
  //   return <Navigate to="/auth/login" />;
  // }

  // // if authenticated && tries to login or register, redirect according to "role"
  // if (
  //   isAuthenticated &&
  //   (location.pathname.includes("/login") ||
  //     location.pathname.includes("/register"))
  // ) {
  //   if (user?.role === "admin") {
  //     return <Navigate to="/admin/dashboard" />;
  //   } else {
  //     return <Navigate to="/shop/home" />;
  //   }
  // }

  // // if user tries to access admin page then, "unauthorized access"
  // if (
  //   isAuthenticated &&
  //   user?.role !== "admin" &&
  //   location.pathname.includes("admin")
  // ) {
  //   return <Navigate to="/unauth-page" />;
  // }

  // // if admin tries to view website then, redirect to "admin dashboard"
  // if (
  //   isAuthenticated &&
  //   user?.role === "admin" &&
  //   location.pathname.includes("shop")
  // ) {
  //   return <Navigate to="/admin/dashboard" />;
  // }

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // // 1️ Handle root "/"
  // if (location.pathname === "/") {
  //   if (!isAuthenticated) return <Navigate to="/auth/login" />;
  //   return user?.role === "admin" ? (
  //     <Navigate to="/admin/dashboard" />
  //   ) : (
  //     <Navigate to="/shop" />
  //   );
  // }

  // // 2️ If not logged in, redirect to login (except for /auth routes)
  // if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
  //   return <Navigate to="/auth/login" state={{ from: location }} replace />;
  // }

  // // 3️ Prevent logged-in users from accessing /auth/login or /auth/register
  // if (isAuthenticated && location.pathname.startsWith("/auth")) {
  //   return user?.role === "admin" ? (
  //     <Navigate to="/admin/dashboard" />
  //   ) : (
  //     <Navigate to="/shop" />
  //   );
  // }

  // // 4️ Role-based restriction
  // if (
  //   isAuthenticated &&
  //   user?.role !== "admin" &&
  //   location.pathname.startsWith("/admin")
  // ) {
  //   return <Navigate to="/unauth-page" />;
  // }

  // if (
  //   isAuthenticated &&
  //   user?.role === "admin" &&
  //   location.pathname.startsWith("/shop")
  // ) {
  //   return <Navigate to="/admin/dashboard" />;
  // }

  return <>{children}</>;
};

export default CheckAuth;
