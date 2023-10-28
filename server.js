const express = require('express');
const carRouter = require('./routes/car.routes');

const PORT = process.env.PORT || 5500; 
const app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use(express.json());

app.use("/api", carRouter);

app.get("", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});



