const {
  getAllSanatcilarService,
  createSanatcilarService,
} = require("../service/sanatcilarService");
const { createAlbumService } = require("../service/albumService");
const { createSarkilarService } = require("../service/sarkiService");
const { randomString, randomDate } = require("../helper/randomString");
const {
  SanatciBazliİstatistikAlService,
} = require("../service/SanatciBazliIstatistikAl");

const getAllSanatcilar = async (req, res) => {
  getAllSanatcilarService()
    .then((result) => {
      if (result.lenght === 0) {
        res.status(404).send("Not Found");
      } else {
        result.forEach((element) => {
          let tarih = new Date(element.kurulus_tarihi);
          let tarihOffset = tarih.getTimezoneOffset();
          tarih.setMinutes(tarih.getMinutes() - tarihOffset);

          element.kurulus_tarihi = tarih.toISOString().slice(0, 10);
        });
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
// 1. SANATÇI EKLEME
const sanatciEkle = async (req, res) => {
  let ad = randomString(5);
  let kurulus_tarihi = randomDate();
  var sanatciId = null;
  // var albumId = null;

  await createSanatcilarService(ad, kurulus_tarihi).then((result) => {
    sanatciId = result.insertId;
    // res.status(200).send(`Inserted.
    // Insert Id: ${result.insertId}`);
  });
  const { albumAdet } = req.body;
  for (let i = 1; i <= albumAdet; i++) {
    let ad = randomString(10);

    let cikis_tarihi = randomDate();
    const result = await createAlbumService(ad, sanatciId, cikis_tarihi).then(
      (result) => {
        // albumId = result.insertId;
        // res.send("Inserted");
        console.log("outside", result.insertId);

        let min = 6;
        let max = 15;
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        for (let i = 0; i <= randomNum; i++) {
          let ad = randomString(15);

          createSarkilarService(ad, result.insertId, sanatciId).then(
            (result) => {
              console.log("inside", result.insertId);
            }
          );
        }
      }
    );
  }

  res.status(200).send(`Inserted.
    //  Insert Id: ${sanatciId}`);
};
const SanatciBazliİstatistik = async (req, res) => {
  const result = await SanatciBazliİstatistikAlService();
  console.log(result);
  if (result) {
    res.status(200).json(result);
  } else return res.status(400).json({ success: false, message: "an error" });
};
module.exports = {
  getAllSanatcilar,
  sanatciEkle,
  SanatciBazliİstatistik,
};
