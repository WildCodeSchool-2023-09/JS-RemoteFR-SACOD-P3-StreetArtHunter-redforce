const argon2 = require("argon2");
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

      const isAdmin = user.is_admin ? 1 : 0;

      const insertId = await tables.users.create({
        pseudo: user.pseudo,
        email: user.email,
        hashedPassword,
        is_admin: isAdmin,
      });

      res.status(201).json({ insertId });
    } else {
      throw new Error("Password is missing");
    }
  } catch (err) {
    next(err);
  }
};

// Login operation
const login = async (req, res, next) => {
  try {
    const token = jwt.sign(req.user, process.env.APP_SECRET);
    if (await tables.users.readByEmailWithPassword(req.body.email)) {
      res.json({ success: "User logged in successfully", token });
    } else {
      res.json({ error: "Oops, incorrect email or password" });
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    // Use userManager to delete the user and associated photos
    await userManager.deleteUserAndAssociatedPhotos(userId);

    // Respond with a 204 status (No Content) to indicate successful deletion
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    // Respond with a 500 status (Internal Server Error) in case of error
    res.status(500).json({
      error: "An error occurred while deleting the user",
    });
  }
}

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  add,
  login,
  deleteUser,
};
