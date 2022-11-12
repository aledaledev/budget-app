const bcrypt = require("bcrypt");

//maneja que sucedera y de donde traera los recursos
const login = (req, res) => {
  if (req.session.loggedin != true) {
    res.render("session/login");
  } else {
    res.redirect("/");
  }
};

const signup = (req, res) => {
  if (req.session.loggedin != true) {
    res.render("session/signup");
  } else {
    res.redirect("/");
  }
};

const authUser = (req, res) => {
  const data = req.body;
  req.getConnection((err, con) => {
    con.query(
      "SELECT * FROM users WHERE email = ?",
      [data.email],
      (err, userdata) => {
        if (userdata.length > 0) {
          userdata.map((elem) => {
            bcrypt.compare(data.password, elem.password, (err, isMatch) => {
              if (!isMatch) {
                res.render("session/login", { error: "Incorrect password!" });
              } else {
                  req.session.loggedin = true;
                  req.session.name = elem.name;
                  res.redirect("/");
                  req.flash('message','Sign up correctly, now Log In for continue!');
                }
            });
    });
} else {
          res.render("session/login", { error: "User not exists!" });
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
          res.render("session/signup", { error: "Email already in use!" });
        } else {
          bcrypt.hash(data.password, 12).then((hash) => {
              data.password = hash;
              const { email, name, password } = data;
            req.getConnection((err, con) => {
              con.query(
                "INSERT INTO users (email,name,password) VALUES (?,?,?) ",
                [email, name, password],
                (err, rows) => {
                    res.redirect("/login");
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
