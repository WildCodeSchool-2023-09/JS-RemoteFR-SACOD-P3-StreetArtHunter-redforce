const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling artwork-related operations
const artworkControllers = require("./controllers/artworkController");

// Route to get a list of artwork
router.get("/artwork", artworkControllers.browse);

// Route to get a specific artwork by ID
router.get("/artwork/:id", artworkControllers.read);

// Route to add a new item
router.post("/artwork", artworkControllers.add);

/* ************************************************************************* */

const userControllers = require("./controllers/userController");

// Route to get a list of items
router.get("/user", userControllers.browse);

// Route to get a specific item by ID
router.get("/user/:id", userControllers.read);

// Route to add a new item
router.post("/user", userControllers.add);

const pictureControllers = require("./controllers/pictureController");

// Route to get a list of items
router.get("/picture", pictureControllers.browse);

// Route to get a specific item by ID
router.get("/picture/:id", pictureControllers.read);

// Route to add a new item
router.post("/picture", pictureControllers.add);

module.exports = router;
