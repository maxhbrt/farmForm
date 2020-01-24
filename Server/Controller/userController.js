const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res, next) => {
    const { farm_name, password, email } = req.body;
    const db = req.app.get("db");
    const foundUser = await db.find_user_by_email(email);
    if (foundUser.length) {
      res.status(400).send("user already exists");
    } else {
      const saltRounds = 12;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const [newUser] = await db.create_user([
        farm_name,
        hashedPassword,
        email
      ]);
      req.session.user = newUser;
      console.log(req.session.user);
      res.status(200).send(req.session.user);
    }
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    db.find_user_by_email(email).then(([foundUser]) => {
      if (!foundUser) {
        res.status(400).send("Go login");
      } else {
        bcrypt.compare(password, foundUser.password).then(isAuthenticated => {
          if (isAuthenticated) {
            req.session.user = {
              user_id: foundUser.user_id,
              farm_name: foundUser.farm_name,
              email: foundUser.email
            };
            res.status(200).send(req.session.user);
          } else {
            res.status(400).send("You are not authorized.");
          }
        });
      }
    });
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("Logged out.");
  },
  userSession: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
};
