const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "public/uploads" });
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling artwork-related operations
const artworkController = require("./controllers/artworkController");
const userController = require("./controllers/userController");
const pictureController = require("./controllers/pictureController");
const hashPasswords = require("./services/auth");
const verifyPasswords = require("./services/auth");
const authController = require("./controllers/authController");

/* PUT */

router.put("/picture/:photoId", pictureController.updateValidationStatus);

/** AUTH */

router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Route to get a list of items
router.get("/user", userController.browse);
router.get("/artwork", artworkController.browse);
router.get("/picture", pictureController.browse);
router.get("/pictures/artworks", pictureController.readAllPictureWithArtwork);
router.get("/pictures/user/:userId", pictureController.readAllPictureWithUser);
router.get(
  "/pictures/validation-status",
  pictureController.readAllPictureWithValidationStatus
);

// Route to get a specific item by ID
router.get("/user/:id", userController.read);
router.get("/artwork/:id", artworkController.read);
router.get("/picture/:id", pictureController.read);

// Route to add a new item
router.post("/user/", hashPasswords.hashPassword, userController.add);
router.post("/login/", verifyPasswords.verifyPwd, userController.login);
router.post("/artwork/", artworkController.add);
router.post("/picture/", upload.single("avatar"), pictureController.add);
router.post("/api/login", authController.login);
router.post("/api/logout", authController.logout);

// Route to delete a new item
router.delete("/user/:id", userController.deleteUser);
router.delete("/artwork/:id", artworkController.deleteArtwork);

/* ************************************************************************* */

module.exports = router;
