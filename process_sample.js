const readline = require("readline");
const fs = require("fs");
const crypto = require("crypto");
const pool = require("./database");

const readInterface = readline.createInterface({
  input: fs.createReadStream("/home/holy/MUESTRA.csv"),
  output: process.output,
  console: false,
});

readInterface.on("line", async (line) => {
  // return false;
  // if (line == "\n") return false;
  const ll = line.split(",");
  const km = ll[3];
  const brand = ll[2];
  const id = crypto.randomBytes(10).toString("hex");

  const [brand_co2] = await pool.query(
    "SELECT brand_co2 FROM brand WHERE brand_name = ?",
    [brand]
  );

  const forecast = brand_co2.brand_co2 * km;
  const write = id + "," + line + "," + forecast + "\n";

  // console.log(id + "," + line, km, brand_co2.brand_co2, forecast);
  console.log(write);
  fs.writeFile("/home/holy/MUESTRA4.csv", write, { flag: "a" }, (err) => {
    if (err) {
      console.log("ERROR");
    } else {
      console.log("END");
    }
  });
  // console.log(line.);
});
