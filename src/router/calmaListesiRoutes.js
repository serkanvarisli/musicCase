const express = require("express");
const router = express.Router();
const {
  getAllCalmaListesi,
  createCalmaListesi,
  createRandomCalmaListesi,
  CalmaListesiOlustur,
  CalmaListesiYenile,
} = require("../controller/calmaListeleriController");

router.get("/", getAllCalmaListesi);
router.post("/new", CalmaListesiOlustur);
router.post("/refresh", CalmaListesiYenile);

module.exports = router;
