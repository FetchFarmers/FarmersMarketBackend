const client = require("./client");
const bcrypt = require("bcrypt")

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username
      FROM users
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createUser({ username, password, email, isAdmin }) {

  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  let userToAdd = { username, hashedPassword, email, isAdmin };
  
  if (!userToAdd.isAdmin){
    userToAdd.isAdmin = false
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, email, "isAdmin") 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, email, "isAdmin";
    `,
      [userToAdd.username, userToAdd.hashedPassword, userToAdd.email, userToAdd.isAdmin]
    );
    return user;
  } catch (error) {
    if (
      error.message.toLowerCase().includes("unique") ||
      error.message.toLowerCase().includes("constraint") ||
      error.message.toLowerCase().includes("failed")
    ) {
      throw new Error("Username already exists");
    }
    console.error(error);
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    let passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else if (!passwordsMatch) {
      return;
    } else {
      throw Error("Error");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(
      `
      SELECT id, username
      FROM users
      WHERE id=$1
    `,
      [userId]
    );
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateUser(id, updates) {
  const setString = Object.keys(updates)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  const values = Object.values(updates);
  values.push(id);
  try {
    const { rows: [user] } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=$${values.length}
      RETURNING *;
    `,
      values
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUsername(username) {
  try {
    const { rows: user } = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    
    if (!user) {
      throw new Error(`User ${username} not found`);
    }
    
    const { rows: orders } = await client.query(
      `
      SELECT orders.*
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE users.username = $1
      `,
      [username]
    );

    const orderIds = orders.map((order) => order.id);
    const { rows: orderProducts } = await client.query(
      `SELECT * FROM order_products WHERE "orderId" = ANY($1)`,
      [orderIds]
    );

    const productIds = orderProducts.map((orderProduct) => orderProduct.productId);
    const { rows: products } = await client.query(
      `SELECT * FROM products WHERE id = ANY($1)`,
      [productIds]
    );

    const orderDetails = orders.map((order) => {
      const orderProductDetails = orderProducts
        .filter((orderProduct) => orderProduct.orderId === order.id)
        .map((orderProduct) => {
          const product = products.find((p) => p.id === orderProduct.productId);
          return {
            productId: product.id,
            productName: product.name,
            productImageURL: product.imageURL,
            productPrice: orderProduct.checkoutPrice,
            quantity: orderProduct.quantity,
          };
        });

      return {
        orderId: order.id,
        sessionId: order.sessionId,
        checkoutDate: order.checkoutDate,
        isCheckedOut: order.isCheckedOut,
        checkoutSum: order.checkoutSum,
        products: orderProductDetails,
      };
    });

    return orderDetails;
  } catch (error) {
    console.error("Error getting orders by username", error);
    throw error;
  }
}


async function deleteUser(id) {
  try {
    await client.query(
      `
      DELETE FROM users
      WHERE id=$1;
    `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  getAllUsers,
  getOrdersByUsername
};
