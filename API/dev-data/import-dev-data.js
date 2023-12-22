const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");
const IceCream = require("../models/icecreamModel");
const { dirname } = require("path");

dotenv.config({ path: `${__dirname}/../config.env` });

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("Database connection established...");
});

const icecream = JSON.parse(
  fs.readFileSync(`${__dirname}/icecream.json`, "utf-8")
);

// for(int i {0};i<)

icecream.forEach((el) => {
  el.image = el.key;
  el.key = undefined;
});
// console.log(icecream);

const importData = async () => {
  try {
    await IceCream.create(icecream);
    console.log("Data Sucessfully Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await IceCream.deleteMany();
    console.log("Data Ducessfully deleted...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
