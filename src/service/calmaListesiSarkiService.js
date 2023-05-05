const pool = require("../db/db");

const getAllCalmaLisetesiSarkiService = async () => {
  sql = "select * from calma_listeleri_sarkilari";
  const [result] = await pool.query(sql);
  return result;
};

const createCalmaLisetesiSarkiService = async (calma_listesi_id, sarki_id) => {
  sql =
    "insert into calma_listeleri_sarkilari (calma_listesi_id,sarki_id) values (?,?)";
  const [result] = await pool.query(sql, [calma_listesi_id, sarki_id]);
  return result;
};
const getCalmaListesiByCalmaListesiIdService = async (calma_listesi_id) => {
  sql = "select * from calma_listeleri_sarkilari where calma_listesi_id=?";
  const [result] = await pool.query(sql, [calma_listesi_id]);
  return result;
};
const getMostListenedSarkiService = async () => {
  sql =
    "Select sarkilar.ad , calma_listeleri_sarkilari.sarki_id , count(calma_listeleri_sarkilari.sarki_id) as DinlenmeSayisi from sarkilar join calma_listeleri_sarkilari on sarkilar.id=calma_listeleri_sarkilari.sarki_id Group by sarkilar.id order by DinlenmeSayisi DESC LIMIT 1";
  const [result] = await pool.query(sql);
  return result;
};
const calmaListesiolusturService = async (calma_listesi_id, sarki_id) => {
  const [result] = await pool.query(
    "INSERT INTO calma_listeleri_sarkilari (calma_listesi_id, sarki_id) VALUES (?, ?)",
    [calma_listesi_id, sarki_id]
  );
  return result;
};

const deleteSarkilarFromSarkiListesi = async (calmaListesiId) => {
  await pool.query(
    "DELETE FROM calma_listeleri_sarkilari WHERE calma_listesi_id = ?",
    [calmaListesiId]
  );
};
const yeniCalmaListeleriSarkiService = async (yeniSarkiValues) => {
  console.log("vidividi", yeniSarkiValues);
  await pool.query(
    "INSERT INTO calma_listeleri_sarkilari (calma_listesi_id, sarki_id) VALUES ?",
    [yeniSarkiValues]
  );
};
const calmaListesiSarkiResultService = async (calmaListesiId) => {
  const [result] = await pool.query(
    "SELECT COUNT(*) as total FROM calma_listeleri_sarkilari WHERE calma_listesi_id = ?",
    [calmaListesiId]
  );
  return result;
};

module.exports = {
  getAllCalmaLisetesiSarkiService,
  createCalmaLisetesiSarkiService,
  getCalmaListesiByCalmaListesiIdService,
  getMostListenedSarkiService,
  calmaListesiolusturService,
  deleteSarkilarFromSarkiListesi,
  yeniCalmaListeleriSarkiService,
  calmaListesiSarkiResultService,
};
