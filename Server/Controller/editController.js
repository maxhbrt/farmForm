module.exports = {
  getEdit: async (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;

    const items = await db.get_edit(user_id);
    res.status(200).send(items);
  }
};
