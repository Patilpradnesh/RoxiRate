const pool = require("../config/db");

// Owner: Get ratings for their store
exports.getOwnerRatings = async (req, res) => {
  try {
    const ownerEmail = req.user.email;

    // Find store owned by this user
    const storeRes = await pool.query(
      "SELECT id, name, address, rating FROM stores WHERE email = $1",
      [ownerEmail]
    );

    if (storeRes.rows.length === 0) {
      return res.status(404).json({ message: "No store found for this owner" });
    }

    const store = storeRes.rows[0];

    // Get all user ratings for that store
    const ratingsRes = await pool.query(
      `SELECT u.name AS user_name, u.email AS user_email, r.rating_value, r.created_at
       FROM ratings r 
       JOIN users u ON u.id = r.user_id
       WHERE r.store_id = $1
       ORDER BY r.created_at DESC`,
      [store.id]
    );

    res.json({
      store,
      ratings: ratingsRes.rows
    });

  } catch (err) {
    console.error("Owner ratings error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Owner dashboard: Show store + avg rating
exports.getOwnerDashboard = async (req, res) => {
  try {
    const ownerEmail = req.user.email;

    const storeRes = await pool.query(
      "SELECT id, name, email, address, rating FROM stores WHERE email = $1",
      [ownerEmail]
    );

    if (storeRes.rows.length === 0) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    res.json(storeRes.rows[0]);

  } catch (err) {
    console.error("Owner dashboard error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
