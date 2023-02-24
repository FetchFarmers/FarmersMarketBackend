const client = require('./client');
const { updateOrderProductCheckoutPrice } = require('./order_products');
const { getUserByUsername } = require('./users');

// * will return a new order for the userId provided //
async function createNewOrder({sessionId, userId}) {
  
  try {
    const {
      rows: [createdOrder] } = await client.query(
      `
        INSERT INTO orders("sessionId", "userId") 
        VALUES($1, $2) 
        RETURNING *;
      `,
      [sessionId, userId]
    );

    return await createdOrder;
  } catch (error) {
    throw error;
  }
}

// * Helper function to get orders with associated products //
async function getOrderById(id) {

  try {

    const { rows: [orderById] } = await client.query(
      `
        SELECT orders.*, users.username AS "orderCreator" 
        FROM orders
        JOIN users ON orders."userId" = users.id
        WHERE orders.id=${id};
      `
    );

    if (orderById){
      const { rows: orderProducts } = await client.query(
        `
          SELECT products.id, products.name, products.description, products.price, order_products.id AS "orderProductId", 
          order_products."orderId", order_products.quantity, order_products."checkoutPrice" 
          FROM products 
          JOIN order_products ON order_products."productId" = products.id 
          WHERE order_products."orderId"=${id};
        `
      );

      orderById.products = orderProducts;
      return orderById;

    }
    
  } catch (error) {
    throw error;
  }
}

//* for admins to see all orders history //
async function getAllClosedOrders() {
  try {

    const { rows: orderId } = await client.query(
      `
        SELECT id
        FROM orders
        WHERE "isCheckedOut"=true;
      `
    );

    const orders = await Promise.all(
      orderId.map((order) => getOrderById(order.id))
    );
      
    return orders;

  } catch (error) {
    throw error;
  }
}

//* for admins to see all outstanding open orders //
async function getAllOpenOrders() {
  try {

    const { rows: orderId } = await client.query(
      `
        SELECT id
        FROM orders
        WHERE "isCheckedOut"=false;
      `
    );

    const orders = await Promise.all(
      orderId.map((order) => getOrderById(order.id))
    );
      
    return orders;

  } catch (error) {
    throw error;
  }
}

//* should get current open order with all orderProducts //
async function getOpenOrdersByUser({ username }) {

  try {

    const { rows: orderId } = await client.query(
      `
      SELECT orders.id
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE users.username='${username}' 
      AND orders."isCheckedOut"=false;
      `
    );

    const orders = await Promise.all(
      orderId.map((order) => getOrderById(order.id))
    );
      
    return orders;

  } catch (error) {
    throw error;
  }

}

//* manually tested and working to return an array of all closed orders for associated userId with orderProducts
async function getClosedOrdersByUser({ username }) {
  try {

    const { rows: orderId } = await client.query(
      `
      SELECT orders.id
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE users.username='${username}' 
      AND orders."isCheckedOut"=true;
      `
    );

    const orders = await Promise.all(
      orderId.map((order) => getOrderById(order.id))
    );
      
    return orders;

  } catch (error) {
    throw error;
  }

}

//* manually tested and working - might be helpful to admins to see how many orders included a specific product
async function getAllOrdersByproduct({ id }) {

  try {

    const { rows: orderIdByproductId } = await client.query(
      `
        SELECT order_products."orderId"
        FROM products 
        JOIN order_products ON order_products."productId" = products.id 
        WHERE products.id=${id};
      `
    );    

    const allOrdersByproductId = await Promise.all(
      orderIdByproductId.map((order) => getOrderById(order.orderId))
    );
     
    return allOrdersByproductId;
  } catch (error) {
    throw error;
  }
   
}

//* manually tested and working - updates the the order to checked out with date and sum and also saves the current price of orderProducts at checkout
async function checkoutOrder({ id, checkoutSum, checkoutDate }) {

  try {

    await client.query(
      `
        UPDATE orders
        SET "checkoutSum"=$1, 
        "checkoutDate"=$2,
        "isCheckedOut"=true
        WHERE id=${ id }
        RETURNING *;
      `, [checkoutSum, checkoutDate]
    );
    
    const orderToUpdate = await getOrderById(id)

    await orderToUpdate.products.map((orderProduct) => { updateOrderProductCheckoutPrice(orderProduct.orderProductId, orderProduct.price)})
      
    return await getOrderById(id)
  }catch(error){
    throw error 
  }
}

//* function if the customer wants to completely cancel his whole order and all included products
async function destroyOrder(id) {

  try {

    await client.query(
      `
        DELETE FROM order_products
        WHERE "orderId"=${id}
        RETURNING *;
      `
    ) 

    const { rows: [deletedOrder] } = await client.query(
      `
      DELETE FROM orders 
      WHERE id=${id}
      RETURNING *;
      `
    )

   return deletedOrder;
  }catch(error) {
    throw error;
  }

}

  // todo (kind of working) add a new row to order_products to add that product to the specific order and create a new order if there isn't an existing order
async function addProductToOrder({orderId, productId, quantity}) {
  
  try {
      

      const { rows: [createdOrderProduct] } = await client.query(
        `
          INSERT INTO order_products("orderId", "productId", quantity) 
          VALUES($1, $2, $3) 
          RETURNING *;
        `,
        [orderId, productId, quantity]
      );

      return await createdOrderProduct;

    // }

  } catch (error) {
    throw error;
  }
}


module.exports = {
createNewOrder,
getOrderById,
getAllClosedOrders,
getAllOpenOrders,
getOpenOrdersByUser,
getClosedOrdersByUser,
getAllOrdersByproduct,
checkoutOrder,
destroyOrder,
addProductToOrder,
};