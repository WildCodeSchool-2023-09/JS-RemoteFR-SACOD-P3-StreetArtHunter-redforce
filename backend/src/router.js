const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const artworkControllers = require("./controllers/artworkController");

// Route to get a list of items
router.get("/artwork", artworkControllers.browse);

// Route to get a specific item by ID
router.get("/artwork/:id", artworkControllers.read);

// Route to add a new item
router.post("/artwork", artworkControllers.add);

/* ************************************************************************* */

module.exports = router;
