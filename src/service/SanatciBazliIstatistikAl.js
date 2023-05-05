const pool = require("../db/db");

const SanatciBazliİstatistikAlService = async () => {
  sql =
    "SELECT sanatcilar.ad AS sanatci_adi, COUNT(albumler.id) AS toplam_album_adedi, SUM(albumler.id) AS toplam_sarki_adedi FROM sanatcilar LEFT JOIN albumler ON sanatcilar.id = albumler.sanatci_id GROUP BY sanatcilar.id ORDER BY toplam_sarki_adedi DESC ";
  const [result] = await pool.query(sql);
  return result;
};

module.exports = { SanatciBazliİstatistikAlService };
