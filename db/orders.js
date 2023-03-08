const client = require('./client');
const { updateOrderProductCheckoutPrice, getOrderProductById } = require('./order_products');
const { updateProduct, getProductById } = require('./products');

// * will return a new order for the userId provided // No API call

async function createNewOrder({sessionId, userId}) {
  
  try {
    const {
      rows: createdOrder } = await client.query(
      `
        INSERT INTO orders("sessionId", "userId") 
        VALUES($1, $2) 
        RETURNING *;
      `,
      [sessionId, userId]
    );

    return createdOrder;
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
          SELECT products.id, products.name, products.description, products.price, products.inventory, order_products.id AS "orderProductId", 
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
          SELECT products.id, products.name, products.description, products.price, products.inventory, order_products.id AS "orderProductId", 
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

//* manually tested and working to search orders by userId // API call to userOrder
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

// * manually tested and working to search orders by session Id
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

// * manually tested all components - see notes below
  // * step 1 - is there a passed in userId? yes(step 2) no(step 8)
  // * step 2 - does userId have an open order? yes(step 3) no(step 4)
  // * step 3 - return open user order - stop
  // * step 4 - does sessionId have an open order? yes(step 5) no(step 7)
  // * step 5 - add userId to db where sessionId continue to step 6
  // * step 6 - return open session order with associated user - stop
  // * step 7 - return object saying no open orders - stop
  // * step 8 - does sessionId have an open order? yes(step 9) no (step 10)
  // * step 9 - return open session order - stop 
  // * step 10 - return object saying no open orders - stop
async function getOpenOrdersByUserInfo({ sessionId, userId }){

  try{

    if (userId) {
      console.log("step 1")
      const openUserOrder = await getOpenOrdersByUser({userId})
      console.log("step 2")
      if (openUserOrder[0]) {
        console.log("step 3")
        return openUserOrder;
        
      } else {

        const openSessionOrder = await getOpenOrdersBySession ({sessionId})
        console.log("step 4")
        if (openSessionOrder[0]) {

          console.log("step 5")
          const { rows: [sessionOrderAddedToUser] } = await client.query(
            `
              UPDATE orders
              SET "userId"=${ userId }
              WHERE id=${ openSessionOrder[0].id }
              RETURNING *;
            `,
          );
          
          console.log("step 6")
          return await getOrderById(sessionOrderAddedToUser.id)

        } else {
          console.log("step 7")
          return ({message: "No open orders"})
          
        }
      }
    } else {

      const openSessionOrder = await getOpenOrdersBySession({sessionId}) 
      console.log("step 8")

      if (openSessionOrder[0]) {
        console.log("step 9")
        return openSessionOrder;

      } else {
        console.log("step 10")
        return ({message: "No open orders"})

      }

    }

  } catch(error) {
    throw(error)
  }
}

// * manually tested all components - see notes below
  // * step 1 - is there a passed in userId? yes(step 2) no(step 8)
  // * step 2 - does userId have an open order? yes(step 3) no(step 4)
  // * step 3 - return open user order - stop
  // * step 4 - does sessionId have an open order? yes(step 5) no(step 7)
  // * step 5 - add userId to db where sessionId continue to step 6
  // * step 6 - return open session order with associated user - stop
  // * step 7 - return order with session and user details - stop
  // * step 8 - does sessionId have an open order? yes(step 9) no (step 10)
  // * step 9 - return open session order - stop 
  // * step 10 - open and return order with session details - stop
async function getOrCreateOpenOrdersByUserInfo({ sessionId, userId }){

  try{

    if (userId) {
      console.log("step 1")
      const openUserOrder = await getOpenOrdersByUser({userId})
      console.log("step 2")
      if (openUserOrder[0]) {
        console.log("step 3")
        return openUserOrder;
        
      } else {

        const openSessionOrder = await getOpenOrdersBySession ({sessionId})
        console.log("step 4")
        if (openSessionOrder[0]) {

          console.log("step 5")
          const { rows: [sessionOrderAddedToUser] } = await client.query(
            `
              UPDATE orders
              SET "userId"=${ userId }
              WHERE id=${ openSessionOrder[0].id }
              RETURNING *;
            `,
          );
          
          console.log("step 6")
          return await getOrderById(sessionOrderAddedToUser.id)

        } else {
          console.log("step 7")
          return await createNewOrder({userId, sessionId})
          
        }
      }
    } else {

      const openSessionOrder = await getOpenOrdersBySession({sessionId}) 
      console.log("step 8")

      if (openSessionOrder[0]) {
        console.log("step 9")
        return openSessionOrder;

      } else {
        console.log("step 10")
        return await createNewOrder({sessionId})

      }

    }

  } catch(error) {
    throw(error)
  }
}

//* manually tested and working to return an array of all closed orders for associated userId with orderProducts
async function getClosedOrdersByUser( userId ) {
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
async function getAllOrdersByProduct( productId ) {

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

    

    await Promise.all(orderToUpdate.products.map((orderProduct) => { 
      updateOrderProductCheckoutPrice(orderProduct.orderProductId, orderProduct.price);
      const newInventory = orderProduct.inventory-orderProduct.quantity
      console.log('newInventory :>> ', newInventory);
      updateProduct(orderProduct.id, {"inventory": newInventory})
    }))
      
    return await getOrderById(id)
  }catch(error){
    throw error 
  }
}

//* manually tested and working - function if the customer wants to completely cancel his entire order and all included products
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

    const openOrder = await getOrCreateOpenOrdersByUserInfo({sessionId, userId})
    console.log("🚀 ~ file: orders.js:361 ~ addProductToOrder ~ openOrder:", openOrder)
    
    
        const orderId = openOrder[0].id

        const { rows: [newOrderProduct] } = await client.query(
          `
            INSERT INTO order_products("orderId", "productId", quantity) 
            VALUES($1, $2, $3) 
            RETURNING *;
          `,
          [orderId, productId, quantity]
        );

        return newOrderProduct
      

  } catch (error) {
    throw error;
  }
}


module.exports = {
createNewOrder,
getOrderById,
getOpenOrdersByUserInfo,
getOrCreateOpenOrdersByUserInfo,
getAllClosedOrders,
getAllOpenOrders,
getOpenOrdersByUser,
getClosedOrdersByUser,
getAllOrdersByProduct,
getOpenOrdersBySession,
checkoutOrder,
destroyOrder,
addProductToOrder,
};