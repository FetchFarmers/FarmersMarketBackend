const client = require('./client');

// Retrieves a list of all products in the database.
async function getProducts() {
  try {
    const { rows: products } = await client.query(`
      SELECT * FROM products;
    `);
    return products;
  } catch (error) {
    throw error;
  }
}

// Retrieves a single product by its ID.
async function getProductById(id) {
  try {
    const { rows: product } = await client.query(`
      SELECT * FROM products
      WHERE id=$1;
    `, [id]);
    return product[0];
  } catch (error) {
    throw error;
  }
}

// Retrieves a list of products that belong to a particular category.
async function getProductsByCategory(category) {
  try {
    const { rows: products } = await client.query(`
      SELECT * FROM products
      WHERE category=$1;
    `, [category]);
    return products;
  } catch (error) {
    throw error;
  }
}

// Retrieves a list of products that belong to a particular subcategory.
async function getProductsBySubcategory(subcategory) {
  try {
    const { rows: products } = await client.query(`
      SELECT * FROM products
      WHERE "subcategory"=$1;
    `, [subcategory]);
    return products;
  } catch (error) {
    throw error;
  }
}

// Creates a new product with the given data.
async function createProduct(productData) {
  const { name, description, inventory, price, category, subcategory, imageURL } = productData;
  try {
    const { rows: [product] } = await client.query(`
      INSERT INTO products(name, description, inventory, price, category, "subcategory", "imageURL")
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `, [name, description, inventory, price, category, subcategory, imageURL]);
    return product;
  } catch (error) {
    throw error;
  }
}

// Updates an existing product with new data.
async function updateProduct(id, updates) {
  const setString = Object.keys(updates).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  const values = Object.values(updates);
  values.push(id);
  try {
    const { rows: [product] } = await client.query(`
      UPDATE products
      SET ${setString}
      WHERE id=$${values.length}
      RETURNING *;
    `, values);
    return product;
  } catch (error) {
    throw error;
  }
}

// Deletes a product from the database by its ID.
async function deleteProduct(id) {
  try {
    await client.query(`
      DELETE FROM products
      WHERE id=$1;
    `, [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySubcategory,
  createProduct,
  updateProduct,
  deleteProduct
};
