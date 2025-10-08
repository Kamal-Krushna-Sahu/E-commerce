import { Product } from "../../models/products.model.js";

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "something went wrong while filtering products !!",
    });
  }
};

export { getFilteredProducts };
