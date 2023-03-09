const express = require('express');
const { requireAdmin } = require('./utils');

const productsRouter = express.Router();
const { 
  getProducts, 
  getProductById, 
  getProductsByCategory, 
  getProductsBySubcategory, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  searchProducts
} = require('../db');

// GET /api/products
// Retrieves a list of all products in the database.
productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

//Include a search endpoint that accepts a search query as a parameter.
productsRouter.get('/search', async (req, res, next) => {
  const searchQuery = req.query.q;
  try {
    const products = await searchProducts(searchQuery);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id
// Retrieves a single product by its ID.
productsRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/category/:category
// Retrieves a list of products that belong to a particular category.
productsRouter.get('/category/:category', async (req, res, next) => {
  const { category } = req.params;
  try {
    const products = await getProductsByCategory(category);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/subcategory/:subcategory
// Retrieves a list of products that belong to a particular subcategory.
productsRouter.get('/subcategory/:subcategory', async (req, res, next) => {
  const { subcategory } = req.params;
  try {
    const products = await getProductsBySubcategory(subcategory);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// POST /api/products
// Creates a new product with the given data.
// Requires admin
productsRouter.post('/', requireAdmin, async (req, res, next) => {
  const productData = req.body;
  console.log(req.body);
  console.log(productData);
  try {
    const product = await createProduct(productData);
    res.send(product);
  } catch (error) {
    next(error);
  }
})

// PATCH /api/products/:id
// Updates an existing product with new data.
// Requires admin
productsRouter.patch('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const product = await updateProduct(id, updates);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:id
// Deletes a product from the database by its ID.
// Requires admin
productsRouter.delete('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});


module.exports = productsRouter;
