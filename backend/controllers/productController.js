import Product from "../models/Product.js";

// API's
// All Products API
const allProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Add New Product API
const newProduct = async (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);
  try {
    const { name, description, price, stock, category } = req.body;
    const image = req.file ? req.file.path : "";

    const product = new Product({
      name,
      category,
      description,
      price,
      stock,
      image,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error in newProduct:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock: req.body.stock },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  console.log("delete prod id __________")
  try {
    const productId = req.params.id;
    console.log(productId)
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export { allProducts, newProduct, updateStock, getCategories, deleteProduct };
