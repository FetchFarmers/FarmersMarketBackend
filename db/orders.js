const client = require('./client');
const { updateOrderProductCheckoutPrice } = require('./order_products');

// * will return a new order for the userId provided // No API call
// todo - still trying to figure out the sessionId and how to include that?
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

// * Helper function to get orders with associated products // No API call
async function getOrderById(id) {

  try {

    const { rows: [userOrderById] } = await client.query(
      `
        SELECT orders.*, users.username AS "orderCreator"
        FROM orders
        JOIN users ON orders."userId" = users.id
        WHERE orders.id=${id};
      `
    );

    if (userOrderById){
      const { rows: orderProducts } = await client.query(
        `
          SELECT products.id, products.name, products.description, products.price, order_products.id AS "orderProductId", 
          order_products."orderId", order_products.quantity, order_products."checkoutPrice" 
          FROM products 
          JOIN order_products ON order_products."productId" = products.id 
          WHERE order_products."orderId"=${id};
        `
      );

      userOrderById.products = orderProducts;
      return userOrderById;

    } else {

      const { rows: [sessionOrderById] } = await client.query(
        `
          SELECT * FROM orders
          WHERE orders.id=${id};
        `
      );

      const { rows: orderProducts } = await client.query(
        `
          SELECT products.id, products.name, products.description, products.price, order_products.id AS "orderProductId", 
          order_products."orderId", order_products.quantity, order_products."checkoutPrice" 
          FROM products 
          JOIN order_products ON order_products."productId" = products.id 
          WHERE order_products."orderId"=${id};
        `
      );

      sessionOrderById.products = orderProducts;
      return sessionOrderById;
      
    }
    
  } catch (error) {
    throw error;
  }
}

//* for admins to see all orders history // API call to /orders/closed
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

//* for admins to see all outstanding open orders // API call to /orders/open
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

//* should get current open order with all orderProducts // API call to userOrder
async function getOpenOrdersByUser({ userId }) {

  try {

    const { rows: orderId } = await client.query(
      `
      SELECT orders.id
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE users.Id='${userId}' 
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

async function getOpenOrdersBySession({ sessionId }) {

  try {

    const { rows: orderId } = await client.query(
      `
        SELECT id FROM orders
        WHERE "sessionId"='${sessionId}' 
        AND "isCheckedOut"=false;
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
async function getClosedOrdersByUser({ userId }) {
  try {

    const { rows: orderId } = await client.query(
      `
      SELECT orders.id
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE users.id='${userId}' 
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
async function getAllOrdersByproduct({ productId }) {

  try {

    const { rows: orderIdByproductId } = await client.query(
      `
        SELECT order_products."orderId"
        FROM products 
        JOIN order_products ON order_products."productId" = products.id 
        WHERE products.id=${productId};
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

//* manually tested and working - checks for existing order if yes adds products if no creates an order and adds products - first looks at user then at session if no user 
async function addProductToOrder({sessionId, userId, productId, quantity}) {

  try {

    if (userId) {

      const userOpenOrder = await getOpenOrdersByUser({userId})
    
      if (userOpenOrder[0]){
        const orderId = userOpenOrder[0].id

        await client.query(
          `
            INSERT INTO order_products("orderId", "productId", quantity) 
            VALUES($1, $2, $3) 
            RETURNING *;
          `,
          [orderId, productId, quantity]
        );

        return await getOrderById(orderId);
      
      } else {

        const newOrder = await createNewOrder({sessionId: sessionId, userId: userId})

        await client.query(
          `
            INSERT INTO order_products("orderId", "productId", quantity) 
            VALUES($1, $2, $3) 
            RETURNING *;
          `,
          [newOrder.id, productId, quantity]
        );

        return await getOrderById(newOrder.id);
      }

    } else if (sessionId) {

      const sessionOpenOrder = await getOpenOrdersBySession({sessionId})
      
      if (sessionOpenOrder[0]) {
      const orderId = sessionOpenOrder[0].id

      await client.query(
        `
          INSERT INTO order_products("orderId", "productId", quantity) 
          VALUES($1, $2, $3) 
          RETURNING *;
        `,
        [orderId, productId, quantity]
      );

      return await getOrderById(orderId);

    } else {

      const newOrder = await createNewOrder({sessionId: sessionId, userId: userId})

      await client.query(
        `
          INSERT INTO order_products("orderId", "productId", quantity) 
          VALUES($1, $2, $3) 
          RETURNING *;
        `,
        [newOrder.id, productId, quantity]
      );

      return await getOrderById(newOrder.id);
      
    }}


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
getOpenOrdersBySession,
checkoutOrder,
destroyOrder,
addProductToOrder,
};