const pool = require("../db/db");

const getAllSarkiService = async () => {
  sql = "select * from sarkilar";
  const [result] = await pool.query(sql);
  return result;
};
const createSarkilarService = async (ad, album_id, sanatci_id) => {
  sql = "insert into sarkilar(ad,album_id,sanatci_id) values (?,?,?)";
  const [result] = await pool.query(sql, [ad, album_id, sanatci_id]);
  return result;
};

const getSarkiBySanatciIdService = async (sanatci_id) => {
  sql = "select * from sarkilar where sanatci_id=?";
  const [result] = await pool.query(sql, [sanatci_id]);
  return result;
};
const getSarkiByAlbumService = async (album_id) => {
  sql = "select * from sarkilar where album_id=(?)";
  const [result] = await pool.query(sql, [album_id]);
  return result;
};

const getTotalSarkiSayisi = async () => {
  const sql = "SELECT COUNT(*) AS total FROM sarkilar";
  const [result] = await pool.query(sql);
  return result;
};

const getRandomSarki = async (selectedSarkilar) => {
  let date = new Date();
  if (selectedSarkilar.length <= 0) {
    selectedSarkilar.push(0);
  }
  const sql =
    "SELECT id FROM sarkilar WHERE id NOT IN (?) AND sanatci_id IN (SELECT id FROM sanatcilar WHERE id < ?) ORDER BY RAND() LIMIT 1";
  const [rows] = await pool.query(sql, [
    selectedSarkilar,
    date.toISOString().split("T")[0],
  ]);
  return rows;
};

module.exports = {
  getAllSarkiService,
  createSarkilarService,
  getSarkiBySanatciIdService,
  getSarkiByAlbumService,
  getTotalSarkiSayisi,
  getRandomSarki,
};
