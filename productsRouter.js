import express from "express";
import productsController from "./productsController.js";

const router = express.Router();

router.get("/products", productsController.getAllProducts);
router.get("/products/:id", productsController.getProductById);
router.post("/products", productsController.createProduct);
router.put("/products/:id", productsController.updateProduct);
router.delete("/products/:id", productsController.deleteProduct);

export default router;
