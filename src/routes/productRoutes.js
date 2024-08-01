const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middleware/productValidation');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                     format: float
 *                   category_id:
 *                     type: integer
 *                   category_name:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', productController.getAllProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 category_id:
 *                   type: integer
 *                 category_name:
 *                   type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:id', productController.getProductById);

/**
 * @openapi
 * /products/category/{categoryId}:
 *   get:
 *     summary: Retrieve products by category
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                     format: float
 *                   category_id:
 *                     type: integer
 *                   category_name:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/category/:categoryId', productController.getProductsByCategory);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 category_id:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', auth, validateProduct, isAdmin, productController.createProduct);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 category_id:
 *                   type: integer
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, validateProduct, isAdmin, productController.updateProduct);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, isAdmin, productController.deleteProduct);

module.exports = router;
