const Product = require("../models/productModel");
const path = require("path");
const fs = require("fs");

// CREATE New Product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      price,
      description,
      stock,
      image,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// READ All Product
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getAllProducts controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// READ Produc by Id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProductById controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Product by Id
exports.updateProductById = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.file) {
      if (product.image) {
        const oldImagePath = path.join(__dirname, "..", product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        product.image = `/uploads/${req.file.filename}`;
      }
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.stock = stock;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in updateProductById controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// DELETE Product by Id
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);
      fs.unlinkSync(imagePath);
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProductById controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};
