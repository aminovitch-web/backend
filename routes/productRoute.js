const express = require('express');
const { createProduct, getProduct, getAllProducts,updateProduct,deleteProduct }= require("../controllers/productControllers");
const router = express.Router();
const { isAdmin,authMiddleware }= require("../middlewares/authMiddleware");
router.post('/',authMiddleware,isAdmin,createProduct);
router.get('/:id',getProduct);
router.put('/:id',authMiddleware,isAdmin,updateProduct)
router.get('/',getAllProducts);
router.delete('/:id',authMiddleware,isAdmin,deleteProduct)
module.exports = router;