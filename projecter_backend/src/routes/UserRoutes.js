const router = require("express").Router();

const { authentication } = require("../utils/Auth");

// Destructuring functions from controller.
const {
  getAllUsers,
  signup,
  login,
  getOneUser,
  deleteOneUser,
  updateUser,
  updatePassword,
  getOneUserById,
  getManyUsers,
} = require("../controllers/UserController");

// Defining api routes.
router.post("/signup", signup);
router.post("/login", login);
router.get("/getone", [authentication], getOneUser);
router.get("/getoneuser/:id", getOneUserById);
router.get("/getmany", getManyUsers);
router.get("/getall", getAllUsers);
router.delete("/delete/:id", deleteOneUser);
router.put("/update", [authentication], updateUser);
router.put("/password/update", [authentication], updatePassword);

module.exports = router;
