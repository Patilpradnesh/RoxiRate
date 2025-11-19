const pool = require("../config/db");


exports.getAllStores = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT 
        s.id,
        s.name,
        s.email,
        s.address,
        s.rating AS average_rating,
        r.rating_value AS user_rating
      FROM stores s
      LEFT JOIN ratings r 
        ON s.id = r.store_id AND r.user_id = $1
      ORDER BY s.id ASC;
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("Store list error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
