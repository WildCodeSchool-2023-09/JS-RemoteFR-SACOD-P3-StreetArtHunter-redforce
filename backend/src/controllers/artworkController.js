// Import access to database tables
const tables = require("../tables");
const ArtworkManager = require("../models/ArtworkManager");

const artworkManager = new ArtworkManager();

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const artworks = await tables.artwork.readAll();

    // Respond with the users in JSON format
    res.json(artworks);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const artwork = await tables.artwork.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (artwork == null) {
      res.sendStatus(404);
    } else {
      res.json(artwork);
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
  // Extract the user data from the request body
  const artwork = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.artwork.create(artwork);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
async function deleteArtwork(req, res) {
  const artworkId = req.params.id;

  try {
    // Utilisez userManager pour appeler la méthode delete
    await artworkManager.delete(artworkId);

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
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  deleteArtwork,
};
