const bcrypt = require("bcrypt");

//maneja que sucedera y de donde traera los recursos
const login = (req, res) => {
  res.render("login/login");
};
const signup = (req, res) => {
  res.render("login/signup");
};

const authUser = (req, res) => {
  const data = req.body;
  req.getConnection((err, con) => {
    con.query("SELECT * FROM users WHERE email = ?",[data.email],(err, userdata) => {
        if (userdata.length > 0) {
          console.log('user exists');
        } else {
          res.render("login/login", { error: "User not exists!" });
        }
      }
    );
  });
};

const storeUser = (req, res) => {
  const data = req.body;
  req.getConnection((err, con) => {
    con.query(
      "SELECT * FROM users WHERE email = ?",
      [data.email],
      (err, userdata) => {
        if (userdata.length > 0) {
          res.render("login/signup", { error: "Email already in use!" });
        } else {
          bcrypt.hash(data.password, 12).then((hash) => {
            data.password = hash;
            const { email, name, password } = data;
            req.getConnection((err, con) => {
              con.query(
                "INSERT INTO users (email,name,password) VALUES (?,?,?) ",
                [email, name, password],
                (err, rows) => {
                  res.redirect("/");
                }
              );
            });
          });
        }
      }
    );
  });
};

module.exports = {
  login,
  signup,
  storeUser,
  authUser,
};
