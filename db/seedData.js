const client = require("./client")

// ! remember to destructure your DB adapter functions here so we can use them to seed the DB 
const {createUser} = require('./users');
const {createProduct} = require('./products');
const {createReview} = require('./reviews');
const {addProductToOrder} = require('./orders')
const {fruitVegProductsToCreate} = require('./productSeedArrays/fruitVegSeed.js')
const {dairyProductsToCreate} = require('./productSeedArrays/dairySeed.js')
const {meatSeafoodProductsToCreate} = require('./productSeedArrays/meatSeafoodSeed.js')
const {bakeryProductsToCreate} = require('./productSeedArrays/bakerySeed.js')

  async function dropTables() {
    try {
      client.connect();
  
      await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users; 
      DROP TABLE IF EXISTS products;
      `);
  
      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
  }
  
  async function createTables() {
    try {
      console.log("Starting to build tables...");
  
      await client.query(`
      CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL, 
      email VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false, 
    );
  
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(500) NOT NULL,
      inventory INTEGER NOT NULL,
      price DECIMAL (10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      "subCategory" VARCHAR(255) NOT NULL,
      "imageURL" VARCHAR(255) NOT NULL
    );
  
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      // todo "sessionId" INTEGER, not sure how this would work. Will circle back if time allows
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      "isCheckedOut" BOOLEAN DEFAULT false, 
      "checkoutPrice" DECIMAL (10,2), 
      UNIQUE ("userId", "productId")
    );
  
    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "userId" INTEGER REFERENCES users(id),
      title VARCHAR(255) NOT NULL, 
      details VARCHAR(2000) NOT NULL,
      "starRating" INTEGER NOT NULL,
      UNIQUE ("userId", "productId")
    )
  `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }
  
  // ! we need to set the user data and fill in the .map( ) argument with the function made to create a user
  async function createInitialUsers() {
    console.log("Starting to create users...")
    try {

      const usersToCreate = [
        { username: "", 
          password: "",
          email: "", 
          isAdmin: "", 
        },        
        { username: "", 
        password: "",
        email: "", 
        isAdmin: "", 
        },
        { username: "", 
        password: "",
        email: "", 
        isAdmin: "", 
        },
        { username: "", 
        password: "",
        email: "", 
        isAdmin: "", 
        },
        { username: "", 
        password: "",
        email: "", 
        isAdmin: "", 
        }
      ]
      const users = await Promise.all(usersToCreate.map())
      
      console.log("🚀 ~ file: seedData.js ~ createInitialUsers ~ users:", users)
      console.log("Finished creating users!")
    } catch (error) {
      console.error("Error creating users!")
      throw error
    }
  }
  
  // ! we need to set the product data seed pages and fill in the .map( ) argument with the function made to create a product
  async function createInitialProducts() {
    try {
      console.log("Starting to create products...")
  
      const bakeryProducts = await Promise.all(bakeryProductsToCreate.map(createProduct))
      const meatSeafoodProducts = await Promise.all(meatSeafoodProductsToCreate.map(createProduct))
      const dairyProducts = await Promise.all(dairyProductsToCreate.map(createProduct))
      const fruitVegProducts = await Promise.all(fruitVegProductsToCreate.map(createProduct))

      console.log("🚀 ~ file: seedData.js ~ createInitialProducts ~ bakeryProducts created:", bakeryProducts)
      console.log("🚀 ~ file: seedData.js ~ createInitialProducts ~ meatSeafoodProducts created:", meatSeafoodProducts)
      console.log("🚀 ~ file: seedData.js ~ createInitialProducts ~ dairyProducts created:", dairyProducts)
      console.log("🚀 ~ file: seedData.js ~ createInitialProducts ~ fruitVegProducts created:", fruitVegProducts)

  
      console.log("Finished creating products!")
    } catch (error) {
      console.error("Error creating products!")
      throw error
    }
  }

  // ! we need to set the review data seed pages and fill in the .map( ) argument with the function made to create a review
  async function createInitialReviews() {
    console.log("Starting to create reviews...")
    try {

      const reviewsToCreate = [
        {
          productId: "",
          userId: "",
          title: "",
          details: "",
          starRating: ""
        },        {
          productId: "",
          userId: "",
          title: "",
          details: "",
          starRating: ""
        },        {
          productId: "",
          userId: "",
          title: "",
          details: "",
          starRating: ""
        }
      ]
      const reviews = await Promise.all(reviewsToCreate.map())
      
      console.log("🚀 ~ file: seedData.js ~ createInitialReviews ~ reviews created:", reviews)
      console.log("Finished creating reviews!")
    } catch (error) {
      console.error("Error creating reviews!")
      throw error
    }
  }

  // ! we need to set the order data seed pages and fill in the .map( ) argument with the function made to create an order
  async function createInitialOrders() {
    console.log("Starting to create reviews...")
    try {

      const ordersToCreate = [
        {
          // todo sessionId: "", not sure how this would work. Will circle back if time allows
          userId: "",
          productId: "",
          quantity: "",
          isCheckedOut: "",
          checkoutPrice: ""
        },
        {
          // todo sessionId: "", not sure how this would work. Will circle back if time allows
          userId: "",
          productId: "",
          quantity: "",
          isCheckedOut: "",
          checkoutPrice: ""
        },
        {
          // todo sessionId: "", not sure how this would work. Will circle back if time allows
          userId: "",
          productId: "",
          quantity: "",
          isCheckedOut: "",
          checkoutPrice: ""
        },
        {
          // todo sessionId: "", not sure how this would work. Will circle back if time allows
          userId: "",
          productId: "",
          quantity: "",
          isCheckedOut: "",
          checkoutPrice: ""
        },

      ]
      const orders = await Promise.all(ordersToCreate.map(addProductToOrder))
      
      console.log("🚀 ~ file: seedData.js ~ createInitialReviews ~ orders:", orders)
      console.log("Finished creating orders!")
    } catch (error) {
      console.error("Error creating orders!")
      throw error
    }
  }

  async function rebuildDB() {
    try {
      await dropTables()
      await createTables()
      await createInitialUsers()
      await createInitialProducts()
      await createInitialReviews()
      await createInitialOrders()
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error
    }
  }

  module.exports = {
    rebuildDB,
    dropTables,
    createTables,
  }
  