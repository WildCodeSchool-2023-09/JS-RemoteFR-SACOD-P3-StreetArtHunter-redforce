const argon2 = require("argon2");
const tables = require("../tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  console.info(req.body);
  try {
    const { password } = req.body;

    if (password) {
      const hashedPassword = await argon2.hash(password, hashingOptions);

      req.body.hashedPassword = hashedPassword;
    } else {
      throw new Error("Password is missing");
    }

    next();
  } catch (err) {
    next(err);
  }
};

const verifyPwd = async (req, res, next) => {
  try {
    const userhashed = await tables.users.readByEmailWithPassword(
      req.body.email
    );
    if (!userhashed) {
      res.status(422).json({ error: "Incorrect e-mail or password." });
      return;
    }
    if (await argon2.verify(userhashed.password, req.body.password)) {
      delete userhashed.password;
      req.user = userhashed;
      next();
    } else {
      res.status(422).json({ error: "Incorrect e-mail or password." });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  hashPassword,
  verifyPwd,
};
