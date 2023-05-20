const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const CloudinaryImage = require("../models/CloudinaryImage");

const createProfileImage = async (file) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    file.path,
    { folder: "ecommerce" }
  );
  const newImage = new CloudinaryImage({
    publicId: public_id,
    imageUrl: secure_url,
  });
  await newImage.save();

  return newImage;
};

const deleteImage = async (file) => {
  try {
    const oldImage = await CloudinaryImage.findByIdAndDelete(file._id);
    await cloudinary.uploader.destroy(oldImage.publicId);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find().populate("profileImage");
    res.status(201).json(users);
  },
  getUser: async (req, res) => {
    const user = await User.findById(req.params.userId).populate(
      "profileImage"
    );
    res.status(200).json(user);
  },
  verifyUser: async (req, res) => {
    const user = await User.findById(req.user).populate("profileImage");
    res.status(200).json(user);
  },
  deleteAll: async (req, res) => {
    // await User.deleteMany();
    res.json({ msg: "Deleted All" });
  },
  deleteUserImage: async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json({ msg: "Something wrong" });
    if (!user.profileImage) {
      return res.status(400).json({ msg: "Không thể xoá ảnh mặc định" });
    }
    const isDeleted = deleteImage(user.profileImage._id);
    user.profileImage = null;
    await user.save();
    if (!isDeleted) return res.status(500).json({ msg: "Lỗi xoá" });
    res.status(200).json({ msg: "Đã xoá user image" });
  },
  deleteUser: async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (user.profileImage) {
      deleteImage(user.profileImage._id);
    }
    res.status(200).json({
      msg: `Deleted ${user.username}`,
    });
  },
  updateUser: async (req, res) => {
    const { password, name } = req.body;
    if (password) {
      const hashPass = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            ...req.body,
            password: hashPass,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ data: user, msg: "Cập nhật mật khẩu thành công" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: { name },
      },
      { new: true }
    );
    res.status(200).json({ data: user, msg: "Cập nhật thành công" });
  },
  updateUserImage: async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!req.file) {
      return res.status(400).json({ msg: "Vui lòng chọn ảnh" });
    }
    const profileImage = await createProfileImage(req.file);
    if (user.profileImage) {
      await deleteImage(user.profileImage._id);
    }
    user.profileImage = profileImage;
    await user.save();
    return res.status(201).json(profileImage);
  },
};
