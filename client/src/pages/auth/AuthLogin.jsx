import CommonForm from "@/components/common/form.jsx";
import { loginFormControls } from "@/config/config.js";
import { loginUser } from "@/store/auth/authSlice.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap() // .unwrap() makes createAsyncThunk act like a normal promise, giving you the raw result or throwing the error instead of a Redux action object.
      .then((res) => {
        if (res?.success) {
          // navigate("/shop")
          {
            toast(res?.message);
          }
        }
      })
      .catch((error) => {
        {
          toast(error?.message);
        }
      });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
