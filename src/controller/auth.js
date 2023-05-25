const AuthModel = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUserRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await AuthModel.createUserRegister(name, email, password);
    res.status(201).json({
      message: "Create New users Success",
      // Mengirimkan data dummy berdasarkan request body
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("test", email, password);

  try {
    // Cari pengguna berdasarkan email
    const user = await AuthModel.loginUser(email);
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Verifikasi kata sandi pengguna
    if (!password) {
      return res.status(400).json({ message: "Nama pengguna dan kata sandi diperlukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("test password", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Kata sandi tidak valid" });
    }

    // Jika verifikasi berhasil, buat token otentikasi menggunakan jsonwebtoken
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret-key', {expiresIn: "1h"});
    console.log("tes token",token);

    // Kirim token sebagai respons
    res.json({ token });
  } catch (err) {
    console.error("Terjadi kesalahan saat melakukan login:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat melakukan login" });
  }
};

module.exports = {
  createUserRegister,
  loginUser,
};
