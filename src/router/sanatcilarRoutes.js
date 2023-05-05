const {
  getAllSanatcilar,
  createSanatcilar,
  // createRandomSanatcilar,
  // faktoriyel,
  sanatciEkle,
  SanatciBazliİstatistik,
} = require("../controller/sanatciController");
const express = require("express");

const router = express.Router();

router.get("/", getAllSanatcilar);
router.post("/sanatciEkle", sanatciEkle);
router.get("/istatistik", SanatciBazliİstatistik);

module.exports = router;
