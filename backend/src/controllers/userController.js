const argon2 = require("argon2");
// Import access to database tables
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const UserManager = require("../models/UserManager");

const userManager = new UserManager();

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.users.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.users.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const user = req.body;

  try {
    if (user.password) {
      const hashedPassword = await argon2.hash(user.password);
      delete user.password;

      const insertId = await tables.users.create({
        pseudo: user.pseudo,
        email: user.email,
        hashedPassword,
      });

      res.status(201).json({ insertId });
    } else {
      throw new Error("Password is missing");
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const token = jwt.sign(req.user, process.env.APP_SECRET);
    if (await tables.users.readByEmailWithPassword(req.body.email)) {
      res.json({ succes: "user loged succes", token });
    } else {
      res.json({ error: "oups une email ou password incorrect" });
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    // Utilisez userManager pour appeler la méthode delete
    await userManager.delete(userId);

    // Répondez avec un statut 204 (No Content) pour indiquer que la suppression a réussi
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    // Répondez avec un statut 500 (Internal Server Error) en cas d'erreur
    res.status(500).json({
      error: "Une erreur est survenue lors de la suppression de l'utilisateur",
    });
  }
}
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  login,
  deleteUser,
};
