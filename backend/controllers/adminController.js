const pool = require("../config/db");
const bcrypt = require("bcrypt");


// ADMIN: Add new store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check email exists
    const exists = await pool.query(
      "SELECT id FROM stores WHERE email = $1",
      [email]
    );
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: "Store already exists" });
    }

    await pool.query(
      "INSERT INTO stores (name, email, address) VALUES ($1, $2, $3)",
      [name, email, address]
    );

    res.json({ message: "Store added successfully" });

  } catch (err) {
    console.error("Admin add store error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getDashboardStats = async (req, res) => {
  try {
    const usersCount = await pool.query("SELECT COUNT(*) FROM users");
    const storesCount = await pool.query("SELECT COUNT(*) FROM stores");
    const ratingsCount = await pool.query("SELECT COUNT(*) FROM ratings");

    res.json({
      total_users: parseInt(usersCount.rows[0].count, 10),
      total_stores: parseInt(storesCount.rows[0].count, 10),
      total_ratings: parseInt(ratingsCount.rows[0].count, 10)
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let { search, role, sort, order } = req.query;

    // defaults
    sort = sort || "name";
    order = order === "desc" ? "DESC" : "ASC";

    let conditions = [];
    let values = [];

    // search filter
    if (search) {
      values.push(`%${search}%`);
      conditions.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR address ILIKE $${values.length})`);
    }

    // role filter
    if (role) {
      values.push(role);
      conditions.push(`role = $${values.length}`);
    }

    let whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

    const query = `
      SELECT id, name, email, address, role 
      FROM users
      ${whereClause}
      ORDER BY ${sort} ${order};
    `;

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    let { search, sort, order } = req.query;

    // defaults
    sort = sort || "name";
    order = order === "desc" ? "DESC" : "ASC";

    let conditions = [];
    let values = [];

    // search filter
    if (search) {
      values.push(`%${search}%`);
      conditions.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR address ILIKE $${values.length})`);
    }

    let whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

    const query = `
      SELECT id, name, email, address, rating 
      FROM stores
      ${whereClause}
      ORDER BY ${sort} ${order};
    `;

    const result = await pool.query(query, values);

    res.json(result.rows);

  } catch (err) {
    console.error("Admin stores list error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. Basic user info
    const userRes = await pool.query(
      "SELECT id, name, email, address, role FROM users WHERE id = $1",
      [userId]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userRes.rows[0];

    // If not store owner → return basic info only
    if (user.role !== "owner") {
      return res.json({
        ...user,
        store_info: null,
        ratings: null
      });
    }

    // 2. If store owner → fetch store details
    const storeRes = await pool.query(
      "SELECT id, name, email, address, rating FROM stores WHERE email = $1",
      [user.email]  // Matching store owner by email
    );

    if (storeRes.rows.length === 0) {
      // owner has no store — still return basic info
      return res.json({
        ...user,
        store_info: null,
        ratings: null
      });
    }

    const store = storeRes.rows[0];
    const storeId = store.id;

    // 3. Get customers who rated this store
    const ratingsRes = await pool.query(
      `SELECT 
        u.name AS user_name,
        u.email AS user_email,
        r.rating_value,
        r.created_at
      FROM ratings r
      JOIN users u ON u.id = r.user_id
      WHERE r.store_id = $1
      ORDER BY r.created_at DESC`,
      [storeId]
    );

    // Final combined object
    res.json({
      ...user,
      store_info: store,
      ratings: ratingsRes.rows
    });

  } catch (err) {
    console.error("Get user detail error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};



exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    // check if email exists
    const exists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // insert user
    await pool.query(
      "INSERT INTO users (name, email, address, password, role) VALUES ($1, $2, $3, $4, $5)",
      [name, email, address, hashed, role]
    );

    res.json({ message: "User created successfully" });

  } catch (err) {
    console.error("Add user error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
