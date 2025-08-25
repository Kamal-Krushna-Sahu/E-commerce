import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ([userName, email, password].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required !!");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with same email already exists !!");
  }

  const user = await User.create({
    userName,
    email: email.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user !!");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, { createdUser }, "User Registered Successfully.")
    );
});

export { registerUser };
