const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "public/uploads" });
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling artwork-related operations
const artworkControllers = require("./controllers/artworkController");
const userControllers = require("./controllers/userController");
const pictureControllers = require("./controllers/pictureController");
const hashPasswords = require("./services/auth");
const verifyPasswords = require("./services/auth");

/** AUTH */
const authController = require("./controllers/authController");

router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Route to get a list of items
router.get("/user", userControllers.browse);
router.get("/artwork", artworkControllers.browse);
router.get("/picture", pictureControllers.browse);
router.get("/pictures/artworks", pictureControllers.readAllPictureWithArtwork);
router.get("/pictures/user/:userId", pictureControllers.readAllPictureWithUser);
router.get(
  "/pictures/validation-status",
  pictureControllers.readAllPictureWithValidationStatus
);

// Route to get a specific item by ID
router.get("/user/:id", userControllers.read);
router.get("/artwork/:id", artworkControllers.read);
router.get("/picture/:id", pictureControllers.read);

// Route to add a new item
router.post("/user/", hashPasswords.hashPassword, userControllers.add);
router.post("/login/", verifyPasswords.verifyPwd, userControllers.login);
router.post("/artwork/", artworkControllers.add);
router.post("/picture/", upload.single("avatar"), pictureControllers.add);

// Route to delete a new item
router.delete("/user/:id", userControllers.deleteUser);
router.delete("/artwork/:id", artworkControllers.deleteArtwork);

/* ************************************************************************* */

module.exports = router;
