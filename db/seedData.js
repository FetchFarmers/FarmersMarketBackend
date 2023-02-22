const client = require("./client")
const {
    createUser,
    createReview,
} = require('./')

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
      "sessionId" INTEGER,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
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
  
  
  
  async function populateInitialData() {
    try {
      // create useful starting data by leveraging your
      // Model.method() adapters to seed your db, for example:
      // const user1 = await User.createUser({ ...user info goes here... })
    } catch (error) {
      throw error;
    }
  }
  
  dropTables()
    .then(buildTables)
    .then(populateInitialData)
    .catch(console.error)
    .finally(() => client.end());
  