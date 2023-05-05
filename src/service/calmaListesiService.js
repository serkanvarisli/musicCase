const { create } = require("domain");
const pool = require("../db/db");

const getAllCalmaListesiService = async () => {
  const [rows] = await pool.query("SELECT * FROM calma_listeleri");
  return rows;
};

const createCalmaListesiService = async (ad) => {
  const [rows] = await pool.query(
    "INSERT INTO calma_listeleri(ad) VALUES (?)",
    [ad]
  );
  return rows;
};

module.exports = { getAllCalmaListesiService, createCalmaListesiService };
