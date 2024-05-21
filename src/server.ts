import app from "./app";
import config from "./app/config";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
// 

// console.log(config.port);
// console.log(process.env.PORT)
// console.log(process.env.DATABASE_URL)
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://product_management:apnsNjAAVkHFaRYc@cluster0.kkqbu90.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    app.listen(3000, () => {
      console.log(`Example app listening on port ${3000}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
