const client = require('./client');

  // * should add a now row to order_products to add that product to the specific order
  async function addProductToOrder({ orderId, productId, quantity}) {
  
    try {
      
      const {
        rows: [createdOrderProduct] } = await client.query(
        `
          INSERT INTO order_products("orderId", "productId", quantity) 
          VALUES($1, $2, $3) 
          RETURNING *;
        `,
        [orderId, productId, quantity]
      );
  
      return await createdOrderProduct;
    } catch (error) {
      throw error;
    }
  }
  
  // * should get the orderProduct by id
  async function getOrderProductById(id) {
  
    try {
      const { rows: [orderProduct] } = await client.query(
        `
          SELECT *
          FROM order_products
          WHERE id=${id};
        `
      );
      
      return orderProduct;
    } catch (error) {
      throw error;
    }
  
  }
  
  // * should get the orderProducts by orderId
  async function getOrderProductByOrder({ id }) {
    try {
      const { rows: orderProductsByOrderId } = await client.query(
        `
          SELECT *
          FROM order_products
          WHERE "orderId"=${id};
        `
      );
      
      return orderProductsByOrderId;
    } catch (error) {
      throw error;
    }
  }
  
  // * should update the quantity of the order product 
  async function updateOrderProductQuantity({ id, quantity }) {

    try {
  
      await client.query(
        `
          UPDATE order_products
          SET quantity=${ quantity }
          WHERE id=${ id }
          RETURNING *;
        `,
      );
        
        
    return await getOrderProductById(id)
    }catch(error){
      throw error;
    }
  
  }

    // * should update the checkout price of the order product when the order is checked out 
  async function updateOrderProductCheckoutPrice({ id, checkoutPrice }) {

    try {
      
      await client.query(
        `
          UPDATE order_products
          SET "checkoutPrice"=${ checkoutPrice }
          WHERE id=${ id }
          RETURNING *;
        `,
      );
            
            
      return await getOrderProductById(id)
    }catch(error){
      throw error;
    }
      
  }
  
  // * should delete the product from the specific order
  async function removeProductFromOrder(id) {
  
    try {
      
      const { rows: [ removedOrderProduct ] } = await client.query(
        `
          DELETE FROM order_products
          WHERE id=${id}
          RETURNING *;
        `
      ) 
  
      return removedOrderProduct;
    }catch(error) {
      throw error;
    }
  
  }
  
  // * should return true if the userId passed in matches the userId of the order associated with the passed in orderProductId 
  async function canEditOrderProduct(orderProductId, userId) {
  
    try {
  
      const { rows: [orderProductById] } = await client.query(
        `
          SELECT "orderId"
          FROM order_products
          WHERE id=${orderProductId};
        `
      );
      
      const { rows: userWithOrder } = await client.query(
        `
          SELECT orders.id 
          FROM orders
          JOIN users ON orders."userId" = users.id
          WHERE users.id=${userId};
        `
      );
      
      const userMatch = userWithOrder.filter((order) => {
        if (order.id === orderProductById.orderId) {
          return true;
        } else {
          return false;
        }
         
      })
      
      const verifyUser = ()=> {
        if (userMatch.length === 0) {
          return false;
        }   else {
          return true;
        }
      } 
     
      return verifyUser()
    } catch (error) {
      throw error;
    }
  
  }

  module.exports = {
        addProductToOrder,
        getOrderProductById,
        getOrderProductByOrder,
        updateOrderProductQuantity,
        updateOrderProductCheckoutPrice,
        removeProductFromOrder,
        canEditOrderProduct,
    };