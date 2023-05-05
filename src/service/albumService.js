const pool = require("../db/db");

const getAllAlbumsService = async () => {
  const sql = "SELECT * FROM albumler";
  const [result] = await pool.query(sql);
  return result;
};

const createAlbumService = async (ad, sanatci_id, cikis_tarihi) => {
  const sql = "insert into albumler(ad,sanatci_id,cikis_tarihi) values (?,?,?)";
  const [rows] = await pool.query(sql, [ad, sanatci_id, cikis_tarihi]);
  return rows;
};

const getAlbumsBySanatciIdService = async (sanatci_id) => {
  const sql = "SELECT * FROM albumler WHERE sanatci_id = ?";
  const [result] = await pool.query(sql, [sanatci_id]);
  return result;
};
const mostSanatciAlbumService = async () => {
  sql =
    "SELECT albumler.sanatci_id, sanatcilar.ad, COUNT(albumler.id) as albumSayi FROM sanatcilar JOIN albumler ON sanatcilar.id = albumler.sanatci_id GROUP BY sanatcilar.id ORDER BY albumSayi DESC LIMIT 1";
  const [result] = await pool.query(sql);

  return result;
};

module.exports = {
  getAllAlbumsService,
  createAlbumService,
  getAlbumsBySanatciIdService,
  mostSanatciAlbumService,
};
