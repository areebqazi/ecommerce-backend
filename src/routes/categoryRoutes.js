const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const validateCategory = require('../middleware/categoryValidation');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The category ID
 *                   name:
 *                     type: string
 *                     description: The category name
 *                   description:
 *                     type: string
 *                     description: The category description
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The category ID
 *                 name:
 *                   type: string
 *                   description: The category name
 *                 description:
 *                   type: string
 *                   description: The category description
 *       404:
 *         description: Category not found
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The category name
 *               description:
 *                 type: string
 *                 description: The category description
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The created category ID
 *                 name:
 *                   type: string
 *                   description: The category name
 *                 description:
 *                   type: string
 *                   description: The category description
 *       400:
 *         description: Invalid input
 */
router.post('/', validateCategory ,auth, isAdmin, categoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The category ID
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
 *                 description: The new category name
 *               description:
 *                 type: string
 *                 description: The new category description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The updated category ID
 *                 name:
 *                   type: string
 *                   description: The new category name
 *                 description:
 *                   type: string
 *                   description: The new category description
 *       404:
 *         description: Category not found
 */
router.put('/:id', validateCategory , auth, isAdmin, categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', auth, isAdmin, categoryController.deleteCategory);

module.exports = router;
