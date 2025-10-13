import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/products.model.js";

const addToCart = async (res, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Inavlid data provided by user !!",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found !!",
      });
    }

    let cart = Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Array.prototype.findIndex() returns the index of the first element in an array that satisfies a provided testing function. If no elements satisfy the condition, it returns -1.
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "addToCart controller Error !!",
    });
  }
};

const fetchCartItems = async (res, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "fetchCartItems controller Error !!",
    });
  }
};

const updateCartItemQty = async (res, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "updateCartItemQty controller Error !!",
    });
  }
};

const deleteCartItem = async (res, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "deleteCartItem controller Error !!",
    });
  }
};

export { addToCart, fetchCartItems, updateCartItemQty, deleteCartItem };
