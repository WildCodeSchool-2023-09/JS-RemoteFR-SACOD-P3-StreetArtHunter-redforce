const argon2 = require("argon2");
const tables = require("../tables");
// Options de hachage (voir documentation : https://github.com/ranisalt/node-argon2/wiki/Options)
// Recommandations **minimales** de l'OWASP : https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
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
      res.status(422).json({ error: "Email ou mot de passe incorrect" });
      return;
    }
    if (await argon2.verify(userhashed.password, req.body.password)) {
      delete userhashed.password;
      req.user = userhashed;
      next();
    } else {
      res.status(422).json({ error: "oups une email ou password incorrect" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  hashPassword,
  verifyPwd,
};
