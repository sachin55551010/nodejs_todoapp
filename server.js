import { app } from "./app.js";
import { connectMongoDB } from "./utils/connect.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8001;

connectMongoDB();

app.listen(PORT, () => {
  console.log(
    `Server running at PORT : ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
