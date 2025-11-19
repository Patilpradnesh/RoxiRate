const pool = require("../config/db");


async function recomputeStoreRating(storeId) {
  const avgRes = await pool.query(
    "SELECT AVG(rating_value)::numeric(3,2) AS avg_rating FROM ratings WHERE store_id = $1",
    [storeId]
  );
  const avg = avgRes.rows[0].avg_rating || 0;
  await pool.query("UPDATE stores SET rating = $1 WHERE id = $2", [avg, storeId]);
  return avg;
}


exports.submitOrUpdateRating = async (req, res) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const userId = req.user && req.user.id;
    const { rating } = req.body;

    // Basic validations
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!storeId || Number.isNaN(storeId)) {
      return res.status(400).json({ message: "Invalid store id" });
    }
    const ratingInt = parseInt(rating, 10);
    if (!rating || Number.isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be an integer between 1 and 5" });
    }

    // Check if store exists
    const storeCheck = await pool.query("SELECT id FROM stores WHERE id = $1", [storeId]);
    if (storeCheck.rows.length === 0) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Check if user already rated this store
    const existing = await pool.query(
      "SELECT id, rating_value FROM ratings WHERE user_id = $1 AND store_id = $2",
      [userId, storeId]
    );

    if (existing.rows.length > 0) {
      // update
      await pool.query(
        "UPDATE ratings SET rating_value = $1, updated_at = NOW() WHERE id = $2",
        [ratingInt, existing.rows[0].id]
      );
    } else {
      // insert
      await pool.query(
        "INSERT INTO ratings (user_id, store_id, rating_value) VALUES ($1, $2, $3)",
        [userId, storeId, ratingInt]
      );
    }

    // Recompute average and update store
    const newAvg = await recomputeStoreRating(storeId);

    // Return success + new average
    return res.json({
      message: "Rating saved",
      storeId,
      rating: ratingInt,
      averageRating: parseFloat(newAvg)
    });
  } catch (err) {
    console.error("Rating error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
