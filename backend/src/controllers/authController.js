const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.users.readByEmailWithPassword(req.body.email);

    if (!user || !user.password) {
      res.status(422).json({ error: "Email ou mot de passe incorrect" });
      return;
    }

    const verified = await argon2.verify(user.password, req.body.password);

    if (verified) {
      delete user.password;

      const token = jwt.sign(
        { sub: user.id, isAdmin: user.isAdmin },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("session_cookie", token, {
        httpOnly: true,
        sameSite: "strict",
      });

      res.json({ user });
    } else {
      res.status(422).json({ error: "Email ou mot de passe incorrect" });
    }
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie("session_cookie");
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  logout,
};
