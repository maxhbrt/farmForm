require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");

app.use(express.json());
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100 * 60 * 60 * 24 * 14
    }
  })
);

app.get("/api/get_edit/:user_id", getEdit);

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/user_session", userSession);
app.delete("/auth/logout", logout);

massive(CONNECTION_STRING).then(db => {
  console.log("database connected");
  app.set("db", db);
});

let port = SERVER_PORT || 4001;
app.listen(port, () => console.log(`up and running on port ${port}`));