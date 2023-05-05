const pool = require("../db/db");

const getAllSanatcilarService = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM sanatcilar ");
    return rows;
  } catch (error) {
    console.log(error);
  }
};
const createSanatcilarService = async (ad, kurulus_tarihi) => {
  const [rows] = await pool.query(
    "insert into sanatcilar(ad,kurulus_tarihi) values (?,?)",
    [ad, kurulus_tarihi]
  );
  return rows;
};

module.exports = { getAllSanatcilarService, createSanatcilarService };
