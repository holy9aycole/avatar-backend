const pool = require("./database");
const crypto = require("crypto");

const getBrand = async (req, res, next) => {
  const brands = await pool.query(
    "SELECT brand_name FROM brand ORDER BY brand_name"
  );
  console.log({ brands });

  res.json({
    status: "OK",
    brands: brands.map((brand) => brand.brand_name),
  });
};

const postForecast = async (req, res, next) => {
  const driver = req.body.driver;
  const carRegistration = req.body.carRegistration;
  const carType = req.body.carType;
  const km = parseInt(String(req.body.km));
  const lifetime = parseInt(String(req.body.lifetime));
  const car_id = crypto.randomBytes(16).toString();

  const forecast_id = crypto.randomBytes(16).toString();

  console.log({ driver, carRegistration, carType, km, lifetime });

  const brand = await pool.query(
    "SELECT brand_co2 FROM brand WHERE brand_name = ?",
    [carType]
  );

  console.log(brand);

  const forecast_co2 = brand.brand_co2 * km;

  await pool.query(
    `INSERT INTO car (
      car_id,
      car_driver,
      car_registration,
      brand_name,
      car_km,
      car_lifetime
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [car_id, car_driver, carRegistration, brand_name, km, lifetime]
  );
  await pool.query(
    `INSERT INTO forecast (
      forecast_id,
      forecast_co2,
      car_id
    ) VALUES (?, ?, ?)`,
    [forecast_id, forecast_co2, car_id]
  );

  res.status(200).json({
    status: "OK",
  });
};

module.exports = { getBrand, postForecast };
