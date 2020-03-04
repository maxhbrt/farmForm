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
    const { quan, item_id, client_id, user_id } = req.body
    const items = await db.add_order([quan, item_id, client_id, user_id])
    res.status(200).send(items)
  },
  editQuan: async (req, res, next) => {
    const db = req.app.get("db")
    const {quan, order_item_id, item_id, ogQuan} = req.body
    console.log(ogQuan)
    const items = await db.edit_quan([quan, order_item_id, item_id, ogQuan])
    res.status(200).send(items)
  },
  getReview: async (req, res, next) => {
    const db = req.app.get("db")
    const {client_id} = req.body
    const items = await db.get_review([client_id])
    res.status(200).send(items)
  }
};
