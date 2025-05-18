import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbConnect/connect.js";
import productRoutes from "./routes/products.js";
import saleRoutes from "./routes/sales.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is not set in the environment variables.");
  process.exit(1);
}
connectDB(mongoURI);

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Backend running on port ${process.env.PORT}`)
);
