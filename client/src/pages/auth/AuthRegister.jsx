import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/config.js";
import { registerUser } from "@/store/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap() // .unwrap() makes createAsyncThunk act like a normal promise, giving you the raw result or throwing the error instead of a Redux action object.
      .then((res) => {
        if (res?.success) {
          {
            toast(res?.message);
          }
          navigate("/auth/login");
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
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
