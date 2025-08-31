import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Somthing went wrong while creating Tokens !!");
  }

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ([userName, email, password].some((field) => field?.trim() === "")) {
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required !!");
  }

  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    throw new ApiError(404, "User Does not exist ! Register first.");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Either email or password is incorrect !!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    existedUser._id
  );

  return res
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: existedUser,
        },
        "User logged in Successfully."
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "Logged out Successfully."));
});

const checkAuth = asyncHandler(async (req, res) => {
  const user = req.user;
  res
    .status(200)
    .json(new ApiResponse(200, { user }, "User is Authenticated."));
});

export { registerUser, loginUser, logoutUser, checkAuth };
