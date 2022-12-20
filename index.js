const express = require("express");
const cookieParser = require("cookie-parser");
const serverlog = require("morgan");
const cors = require("cors");
const {
  getBrand,
  postForecast,
  searchProject,
  createProject,
  getProject,
  getAllProject,
  getAllProjectForecast,
  getBrandCO2,
  getForecastPeriod,
} = require("./controller");
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
app.get("/brand/co2", getBrandCO2);
app.post("/forecast", postForecast);
app.get("/project", getAllProject);
app.get("/project/forecast", getAllProjectForecast);
app.get("/project/:period_id", getProject);
app.post("/project", createProject);
app.get("/project/search", searchProject);
app.get("/forecast", getForecastPeriod);

app.listen(app.get("PORT"), app.get("HOST"), () => {
  console.log(
    "Sever running on http://" + app.get("HOST") + ":" + app.get("PORT")
  );
});
