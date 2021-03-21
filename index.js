const express = require("express");
const getData = require("./utils/getData");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.post("/", async (req, res) => {
  //Veri çekmek istedigimiz apinin url'ini post request ile body altında url olarak yollarız
  const { url } = req.body;

  const data = await getData(url); //Verdigimiz apiden verinin çekilmesini bekleriz
  if (data) {
    return res.json({ success: true, data });
  } else {
    return res.json({ success: false, data: "Hata oluştu" });
  }
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running on http://localhost:${PORT}`);
});
