import express from "express";
import multer from 'multer';
import { allProducts, deleteProduct, getCategories, newProduct, updateStock } from "../controllers/productController.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.route("/").get(allProducts);
router.route("/add-new").post(upload.single('image'), newProduct);
router.route("/:id").put(updateStock);
router.route("/:id").delete(deleteProduct);
router.route("/categories").get(getCategories);




export default router;