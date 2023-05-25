const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const createUserRegister = async (name, email, password) => {
  const checkDuplicateQuery =
    "SELECT COUNT(*) AS count FROM users WHERE email = ?";
  const [rows] = await pool.execute(checkDuplicateQuery, [email]);
  const count = rows[0].count;

  if (count > 0) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Menggunakan bcrypt untuk menghasilkan hash password

  const [result] = await pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
    name,
    email,
    hashedPassword,
  ]);
  const id = result.insertId;
  return { id, name , email };
};

const loginUser = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

module.exports = {
  createUserRegister,
  loginUser,
};
