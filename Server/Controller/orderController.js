module.exports = {
  getOrderItems: async (req, res, next) => {
    const db = req.app.get("db");

    const items = await db.get_order_items();
    res.status(200).send(items);
  },
  addClient: async (req, res, next) => {
    const db = req.app.get("db");
    const { business_name } = req.body
    const items = await db.add_client([business_name]);
    res.status(200).send(items)
    
  },
  editClient: async (req, res, next) => {
    const db = req.app.get("db");
    const { business_name, client_id } = req.body
    const items = await db.edit_client([business_name, client_id]);
    res.status(200).send(items)
  },
  addOrder: async (req, res, next) => {
    const db = req.app.get("db");
    const { quan, item_id, client_id } = req.body
    const items = await db.add_order([quan, item_id, client_id])
    res.status(200).send(items)
  }
};
