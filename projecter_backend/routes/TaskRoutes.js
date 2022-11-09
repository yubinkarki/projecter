const router = require("express").Router();
const { authentication } = require("../utils/Auth");

const {
  getAllTasks,
  createTask,
  getOneTask,
  changeTaskStatus,
  getManyTasks,
  getUserCurrentTasks,
} = require("../controllers/TaskController");

router.get("/getone/:id", [authentication], getOneTask);
router.get("/getall", [authentication], getAllTasks);
router.get("/getmanytasks", getManyTasks);
router.get("/getusertasks", getUserCurrentTasks);
router.post("/create", createTask);
router.put("/changetaskstatus/:id", changeTaskStatus);

module.exports = router;
