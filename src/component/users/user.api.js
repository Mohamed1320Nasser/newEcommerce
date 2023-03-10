const { SignUp, Signin } = require("./user.auth");
const {
  creatUser,
  getUsers,
  getUser,
  updUser,
  delUser,
  ChangePass,
} = require("./user.service");

const router = require("express").Router();

router.route("/").post(creatUser).get(getUsers);
router.route("/:id").get(getUser).put(updUser).delete(delUser);
router.patch("/changePassword/:id", ChangePass);
router.post("/signUp", SignUp);
router.post("/signin", Signin);

module.exports = router;
