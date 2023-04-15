const userCtrl = require("../controllers/userCtrl");
const multer = require("multer");
const upload = multer({ dest: "/uploads" });

const router = require("express").Router();

router.get("/", userCtrl.getUsers);
router.get("/:userId", userCtrl.getUser);
router.delete("/", userCtrl.deleteAll);
router.delete("/:userId", userCtrl.deleteUser);
router.put("/:userId", upload.single("profileImage"), userCtrl.updateUser);

module.exports = router;
