const express = require("express");
const router = express.Router();

const GenericCodeController = new (require("../controllers/genericCodes"))();

router.get("/", GenericCodeController.getGenericCodes);

module.exports = router;
