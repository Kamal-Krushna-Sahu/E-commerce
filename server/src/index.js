import "dotenv/config";
// console.log("dotenv: ", process.env);
import connectDB from "./db/db.index.js";
import { app } from "./app.js";

const port = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection Failed !!", error);
  });
