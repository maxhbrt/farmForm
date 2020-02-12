module.exports = {
  getEdit: async (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;

    const items = await db.get_edit([user_id]);
    if (!items) {
    } else {
      res.status(200).send(items);
    }
  },
  addToEdit: async (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { name, unit, price, avail } = req.body;

    const edits = await db.add_edit([user_id, name, unit, price, avail]);
    res.status(200).send(edits);
  },
  deleteFromEdit: async (req, res, next) => {
    const { item_id } = req.params;

    const db = req.app.get("db");
    const results = await db.delete_from_edit([item_id]);
    res.status(200).send(results);
  },
  deleteAllEdit: async (req, res, next) => {
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    const results = await db.delete_all_items([user_id]);
    res.status(200).send(results);
  },
  editEdit: async (req, res, next) => {
    const db = req.app.get("db");
    
    const { item_id, name, unit, price, avail } = req.body;
    const results = await db.edit_edit([item_id, name, unit, price, avail]);
    res.status(200).send(results);
  }
};
