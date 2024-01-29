// Import access to database tables
const fs = require("fs");
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const photos = await tables.photos.readAll();

    // Respond with the items in JSON format
    res.json(photos);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const photo = await tables.photos.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (photo == null) {
      res.sendStatus(404);
    } else {
      res.json(photo);
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
  // We know someone is authenticated
  // Only allowed if admin

  // Extract the item data from the request body
  const photo = req.body;
  const avatar = req.file;

  fs.renameSync(
    `${avatar.destination}/${avatar.filename}`,
    `${avatar.destination}/${avatar.filename}-${avatar.originalname}`
  );
  try {
    // Insert the item into the database
    const insertId = await tables.photos.create(
      photo,
      `${avatar.destination}/${avatar.filename}-${avatar.originalname}`
    );

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
