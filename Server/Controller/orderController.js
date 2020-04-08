module.exports = {
  getOrderItems: async (req, res, next) => {
    const db = req.app.get("db");

    const items = await db.get_order_items();
    res.status(200).send(items);
  },
  addClient: async (req, res, next) => {
    const db = req.app.get("db");
    const { business_name } = req.body;
    const items = await db.add_client([business_name]);
    res.status(200).send(items);
  },
  editClient: async (req, res, next) => {
    const db = req.app.get("db");
    const { business_name, client_id } = req.body;
    const items = await db.edit_client([business_name, client_id]);
    res.status(200).send(items);
  },
  addOrder: async (req, res, next) => {
    const db = req.app.get("db");
    const { item_id, quan, client_id } = req.body;
    const items = await db.add_unnest([item_id, quan, client_id]);
console.log(req.body)
    res.status(200).send(items);
  },
  editQuan: async (req, res, next) => {
    const db = req.app.get("db");
    const { quan, order_item_id, item_id, ogQuan } = req.body;
    console.log(ogQuan);
    const items = await db.edit_quan([quan, order_item_id, item_id, ogQuan]);
    res.status(200).send(items);
  },
  getReview: async (req, res, next) => {
    const db = req.app.get("db");
    const { client_id } = req.body;
    const items = await db.get_review([client_id]);
    res.status(200).send(items);
  },
  getOrders: async (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const items = await db.get_orders([user_id]);
    res.status(200).send(items);
  },

  clearAllOrders: async (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const items = await db.clear_all_orders([user_id]);
    res.status(200).send(items);
  },
  removeFromOrders: async (req, res, next) => {
    const db = req.app.get("db");
    const { order_item_id } = req.body;
    const items = await db.remove_from_orders([order_item_id]);
    res.status(200).send(items);
  },
  completeOrder: async (req, res, next) => {
    const db = req.app.get("db");
    const {clientInfo} = req.body
    
    const items = await db.complete_order([clientInfo])
    res.status(200).send(items)
  }
};
