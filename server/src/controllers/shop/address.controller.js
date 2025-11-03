import { Address } from "../../models/address.model.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "All fields are required !!",
      });
    }

    const newlyCreatedAddress = await Address.create({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    if (!newlyCreatedAddress) {
      return res.status(500).json({
        success: false,
        message: "something went wrong while adding address !!",
      });
    }

    return res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
      message: "Address added successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while adding address !!",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required !!",
      });
    }

    const addressList = await Address.find({ userId });

    if (!addressList) {
      return res.status(404).json({
        success: false,
        message: "No address found !!",
      });
    }

    return res.status(200).json({
      success: true,
      data: addressList,
      message: "Address fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while adding address !!",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and addressId is required !!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "address not found !!",
      });
    }

    return res.status(200).json({
      success: true,
      data: address,
      message: "address edited successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while adding address !!",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and addressId is required !!",
      });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "address not found !!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "address deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while adding address !!",
    });
  }
};

export { addAddress, fetchAllAddress, editAddress, deleteAddress };
