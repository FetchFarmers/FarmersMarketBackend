const client = require("./client")

// ! remember to destructure your DB adapter functions here so we can use them to seed the DB //
const {createUser} = require('./users');
const {createProduct} = require('./products');
const {createReview} = require('./reviews');
const {createNewOrder, addProductToOrder} = require('./orders')
const {fruitVegProductsToCreate, dairyProductsToCreate, meatSeafoodProductsToCreate, bakeryProductsToCreate} = require('./productSeedArrays');



  async function dropTables() {
    try {
      client.connect();
  
      await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS reviews;
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
      "isAdmin" BOOLEAN DEFAULT false
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
      "sessionId" VARCHAR(255),
      "userId" INTEGER REFERENCES users(id),
      "checkoutDate" VARCHAR(255), 
      "isCheckedOut" BOOLEAN DEFAULT false, 
      "checkoutSum" DECIMAL (10,2)
    );
  
    CREATE TABLE order_products (
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      "checkoutPrice" DECIMAL (10,2), 
      UNIQUE ("orderId", "productId")
    );

    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "userId" INTEGER REFERENCES users(id),
      title VARCHAR(255) NOT NULL, 
      details VARCHAR(2000) NOT NULL,
      "starRating" INTEGER NOT NULL,
      UNIQUE ("userId", "productId")
    );

  `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }
  
  async function createInitialUsers() {
    console.log("Starting to create users...")
    try {

      const usersToCreate = [
        { username: "catherine", 
          password: "dairy",
          email: "catherine.mugnaI@gmail.com", 
          isAdmin: true, 
        },        
        { username: "hollye", 
        password: "fruit&veg",
        email: "hollyekedge@gmail.com", 
        isAdmin: true, 
        },
        { username: "meanith", 
        password: "bakery",
        email: "huon.meanith@gmail.com", 
        isAdmin: true, 
        },
        { username: "amandatang", 
        password: "wagyu",
        email: "amandaltang13@gmail.com", 
        isAdmin: true, 
        },
        { username: "Joseph", 
        password: "test123456",
        email: "test@gmail.com",
        }
      ]
      const users = await Promise.all(usersToCreate.map(createUser))
      
      console.log("🚀 ~ file: seedData.js ~ createInitialUsers ~ users:", users)
      console.log("Finished creating users!")
    } catch (error) {
      console.error("Error creating users!")
      throw error
    }
  }
  
  async function createInitialProducts() {
    try {
      console.log("Starting to create products...")

      const bakeryProducts = await Promise.all(bakeryProductsToCreate.map(createProduct))
      console.log("🚀 ~ file: seedData.js ~ createInitialProducts ~ bakeryProducts created:", bakeryProducts)

      const meatSeafoodProducts = await Promise.all(meatSeafoodProductsToCreate.map(createProduct))
      console.log("🚀 ~ file: seedData.js ~ createInitialProducts ~ meatSeafoodProducts created:", meatSeafoodProducts)

      const dairyProducts = await Promise.all(dairyProductsToCreate.map(createProduct))
      console.log("🚀 ~ file: seedData.js ~ createInitialProducts ~ dairyProducts created:", dairyProducts)

      const fruitVegProducts = await Promise.all(fruitVegProductsToCreate.map(createProduct))
      console.log("🚀 ~ file: seedData.js ~ createInitialProducts ~ fruitVegProducts created:", fruitVegProducts)
  
      console.log("Finished creating products!")
    } catch (error) {
      console.error("Error creating products!")
      throw error
    }
  }

  // ! we need to set the review data seed pages and fill in the .map( ) argument with the function made to create a review
  async function createInitialReviews() {
  //   console.log("Starting to create reviews...")
  //   try {

  //     const reviewsToCreate = [
  //       {
  //         productId: "",
  //         userId: "",
  //         title: "",
  //         details: "",
  //         starRating: ""
  //       },        {
  //         productId: "",
  //         userId: "",
  //         title: "",
  //         details: "",
  //         starRating: ""
  //       },        {
  //         productId: "",
  //         userId: "",
  //         title: "",
  //         details: "",
  //         starRating: ""
  //       }
  //     ]
  //     const reviews = await Promise.all(reviewsToCreate.map())
      
  //     console.log("🚀 ~ file: seedData.js ~ createInitialReviews ~ reviews created:", reviews)
  //     console.log("Finished creating reviews!")
  //   } catch (error) {
  //     console.error("Error creating reviews!")
  //     throw error
  //   }
  }

  async function createInitialOrders() {
    console.log("Starting to create reviews...")
    try {

      const ordersToCreate = [
        {
          sessionId: "5698abc", 
          userId: 5,
        },
        {
          sessionId: "5648hth",
          userId: 2,
        },
        {
          sessionId: "3645wfe",
          userId: 3,
        },
        {
          sessionId: "6489igj",
          userId: 4,
        },
        {
          sessionId: "4647sre",
          userId: 1,
        }
      ]

      const orders = await Promise.all(ordersToCreate.map(createNewOrder))
            
      console.log("🚀 ~ file: seedData.js ~ createInitialOrders ~ orders:", orders)
      console.log("Finished creating orders!")
    } catch (error) {
      console.error("Error creating orders!")
      throw error
    }
  }

  async function createInitialOrderProducts() {
    console.log("Starting to add products to orders...")
    try {

      const productsToAddToOrder = [
        {
          userId: 1,
          productId: 22,
          quantity: 1,
        },
        {
          userId: 2,
          productId: 5,
          quantity: 1,
        },
        {
          userId: 3,
          productId: 10,
          quantity: 1,
        },
        {
          userId: 3,
          productId: 25,
          quantity: 1,
        },
        {
          userId: 4,
          productId: 30,
          quantity: 3,
        },
        {
          userId: 5,
          productId: 62,
          quantity: 1,
        },

      ]

      const orderProducts = await Promise.all(productsToAddToOrder.map(addProductToOrder))
            
      console.log("🚀 ~ file: seedData.js ~ createInitialOrderProducts ~ orderProducts:", orderProducts)
      console.log("Finished adding products to orders!")
    } catch (error) {
      console.error("Error creating orderProducts!")
      throw error
    }
  }


  async function rebuildDB() {
    try {
      await dropTables()
      await createTables()
      await createInitialUsers()
      await createInitialProducts()
      await createInitialOrders()
      await createInitialOrderProducts()
      // await createInitialReviews()
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
  