module.exports = {
  getOrderItems: async (req, res, next) => {
    const db = req.app.get("db");

    const items = await db.get_order_items();
    res.status(200).send(items);
  }
};
