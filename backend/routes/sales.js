import express from "express";

import { getSalesData, sale, summary } from "../controllers/saleController.js";

const router = express.Router();

router.route("/").post(sale);

router.route("/").get(getSalesData);

router.route("/summary").get(summary);

export default router;