const pool = require("./database");
const crypto = require("crypto");

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const getBrand = async (req, res, next) => {
  const brands = await pool.query(
    "SELECT brand_name FROM brand ORDER BY brand_name"
  );
  const projects = await pool.query(
    "SELECT period FROM project ORDER BY period DESC"
  );

  res.json({
    status: "OK",
    brands: brands.map((brand) => brand.brand_name),
    projects: projects.map((project) => project.period),
  });
};

const getBrandCO2 = async (req, res, next) => {
  const brands = await pool.query("SELECT * FROM brand");

  console.log(brands);

  res.status(200).json({
    status: "OK",
    brands: brands.map((brand) => ({
      name: brand.brand_name,
      co2: brand.brand_co2,
    })),
  });
};

const postForecast = async (req, res, next) => {
  const period = req.body.period;
  const driver = req.body.driver;
  const carRegistration = req.body.carRegistration;
  const carType = req.body.carType;
  const km = req.body.km;
  const car_id = crypto.randomBytes(6).toString("hex");

  const [brand] = await pool.query(
    "SELECT brand_co2 FROM brand WHERE brand_name = ?",
    [carType]
  );

  const forecast_co2 = brand.brand_co2 * km;
  console.log({ brand_co2: brand.brand_co2, km, forecast_co2 });

  await pool.query(
    `INSERT INTO car (
      car_id,
      car_driver,
      car_registration,
      brand_name,
      car_km,
      forecast_co2,
      period
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [car_id, driver, carRegistration, carType, km, forecast_co2, period]
  );

  res.status(200).json({
    status: "OK",
  });
};

const getProject = async (req, res, next) => {
  const period = req.params.period_id;

  const [totalForecast] = await pool.query(
    "SELECT SUM(forecast_co2) AS forecast_co2 FROM car WHERE period = ?",
    [period]
  );
  const forecastByBrand = await pool.query(
    "SELECT SUM(forecast_co2) AS forecast_co2, brand_name, COUNT(*) AS registerCars FROM car WHERE period = ? GROUP BY brand_name",
    [period]
  );

  const [registerCars] = await pool.query(
    "SELECT COUNT(*) AS count FROM car WHERE period = ?",
    [period]
  );

  res.status(200).json({
    status: "OK",
    project: {
      period,
      totalForecast: (totalForecast.forecast_co2 / 1000).toFixed(2),
      forecastByBrand,
      registerCars: registerCars.count,
    },
  });
};

const getAllProject = async (req, res, next) => {
  const period = req.query.project;
  let projects = [];
  let registerCars = null;
  let totalCO2 = null;

  console.log(period);
  if (period) {
    console.log("--------- FUNCIONA ----------");
    projects = await pool.query("SELECT * FROM project WHERE period LIKE ?", [
      "%" + period + "%",
    ]);
  } else {
    projects = await pool.query("SELECT * FROM project");
  }

  console.log(projects);

  res.status(200).json({
    status: "OK",
    projects,
  });
};

const getAllProjectForecast = async (req, res, next) => {
  const [totalForecast] = await pool.query(
    "SELECT AVG(forecast_co2) AS forecast_co2 FROM car GROUP BY period"
  );

  res.status(200).json({
    status: "OK",
    project: {
      totalForecast: (totalForecast.forecast_co2 / 1000).toFixed(2),
    },
  });
};

const searchProject = async (req, res, next) => {
  const period = req.query.period;

  const project = await pool.query("SELECT * FROM project WHERE period = ?", [
    project,
  ]);

  res.status(200).json({
    status: "OK",
    project,
  });
};

const createProject = async (req, res, next) => {
  const period = req.body.project;

  await pool.query("INSERT INTO project (period) VALUES (?)", [period]);

  res.status(200).json({
    status: "OK",
  });
};

const getForecastPeriod = async (req, res, next) => {
  const forecasts = await pool.query(
    "SELECT SUM(forecast_co2) AS co2, period FROM car GROUP BY period"
  );

  res.status(200).json({
    status: "OK",
    forecasts: forecasts.map((forecast) => ({
      period: forecast.period,
      co2: parseFloat(forecast.co2) / 1000,
    })),
  });
};

module.exports = {
  getBrand,
  getBrandCO2,
  postForecast,
  getProject,
  getAllProject,
  searchProject,
  createProject,
  getAllProjectForecast,
  getForecastPeriod,
};
