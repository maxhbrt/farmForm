module.exports = {
  getEdit: async (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;

    const items = await db.get_edit(user_id);
    res.status(200).send(items);
  },
  addToEdit: async (req, res, next) => {
    const db = req.app.get("db");
    const { user_id, name, unit, price, avail } = req.body;

    const edits = await db.add_edit([user_id, name, unit, price, avail]);
    res.status(200).send(edits);
  }
};
