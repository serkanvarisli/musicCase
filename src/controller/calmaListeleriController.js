const { randomString } = require("../helper/randomString");
const pool = require("../db/db");
const {
  getAllCalmaListesiService,
  createCalmaListesiService,
} = require("../service/calmaListesiService");
const {
  getTotalSarkiSayisi,
  getRandomSarki,
} = require("../service/sarkiService");
const {
  calmaListesiolusturService,
  deleteSarkilarFromSarkiListesi,
  yeniCalmaListeleriSarkiService,
  calmaListesiSarkiResultService,
} = require("../service/calmaListesiSarkiService");

const getAllCalmaListesi = async (req, res) => {
  getAllCalmaListesiService().then((result) => {
    if (result.length === 0) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).send(result);
    }
  });
};
// 2.ÇALMA LİSTESİ OLUŞTUR --------------------
const CalmaListesiOlustur = async (req, res) => {
  const { sarkiAdet, ad } = req.body;

  if (sarkiAdet === 0 || !ad) {
    throw new Error("Hatalı parametreler");
  }

  const totalSarkiResult = await getTotalSarkiSayisi();
  console.log(totalSarkiResult);
  const totalSarki = totalSarkiResult[0].total;

  if (sarkiAdet > totalSarki) {
    throw new Error("Yetersiz şarkı adedi");
  }

  const insertResult = await createCalmaListesiService(ad);
  const calmaListesiId = insertResult.insertId;

  const selectedSarkilar = new Set();

  while (selectedSarkilar.size < sarkiAdet) {
    let selectedSarkilarArray = Array.from(selectedSarkilar);
    const sarkiResult = await getRandomSarki(selectedSarkilarArray);
    if (sarkiResult.length === 0) {
      throw new Error("Yetersiz şarkı adedi");
    }
    const sarkiId = sarkiResult[0].id;
    selectedSarkilar.add(sarkiId);
    await calmaListesiolusturService(calmaListesiId, sarkiId);
  }

  res.status(200).json(calmaListesiId);
};
// 3.ÇALMA LİSTESİ YENİLE-------------------------------------------------------------------------------
const CalmaListesiYenile = async (req, res) => {
  const { calmaListesiId, yeniSarkiAdet } = req.body;

  const totalSarkiResult = await getTotalSarkiSayisi();
  const totalSarkiAdet = totalSarkiResult[0].total;

  deleteSarkilarFromSarkiListesi(calmaListesiId);

  const selectedSarkilar = new Set();
  while (selectedSarkilar.size < yeniSarkiAdet) {
    let selectedSarkilarArray = Array.from(selectedSarkilar);
    const sarkiResult = await getRandomSarki(selectedSarkilarArray);
    if (sarkiResult.length === 0) {
      throw new Error("Yeterli sayıda uygun şarkı bulunamadı");
    }
    selectedSarkilar.add(sarkiResult[0].id);
  }

  const yeniSarkiValues = Array.from(selectedSarkilar).map((sarkiId) => [
    calmaListesiId,
    sarkiId,
  ]);
  await yeniCalmaListeleriSarkiService(yeniSarkiValues);
  const calmaListesiSarkiResult = await calmaListesiSarkiResultService(
    calmaListesiId
  );
  const calmaListesiSarkiAdet = calmaListesiSarkiResult[0].total;
  if (calmaListesiSarkiAdet > totalSarkiAdet) {
    throw new Error("Çalma listesi için yeterli sayıda uygun şarkı yok");
  }
  res.status(200).json({ success: true, message: "ÇALMA LİSTESİ YENİLENDİ" });
};

module.exports = {
  getAllCalmaListesi,
  CalmaListesiOlustur,
  CalmaListesiYenile,
};
