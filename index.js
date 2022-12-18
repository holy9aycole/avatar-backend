const express = require("express");
const cookieParser = require("cookie-parser");
const serverlog = require("morgan");
const cors = require("cors");
const { getBrand, postForecast } = require("./controller");
require("./database");

const app = express();

app.set("PORT", 5000);
app.set("HOST", "localhost");

app.use(serverlog("dev"));
app.use(cors());

app.use(cookieParser("secrete01213"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/brand", getBrand);
app.post("/forecast", postForecast);

app.listen(app.get("PORT"), app.get("HOST"), () => {
  console.log(
    "Sever running on http://" + app.get("HOST") + ":" + app.get("PORT")
  );
});
