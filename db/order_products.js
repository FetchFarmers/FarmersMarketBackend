const client = require('./client');

  // * manually tested and working to get the orderProduct by id
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
  
  // * manually tested and working to get the orderProducts by orderId
  async function getOrderProductsByOrder({ orderId }) {
    try {
      const { rows: orderProductsByOrderId } = await client.query(
        `
          SELECT *
          FROM order_products
          WHERE "orderId"=${orderId};
        `
      );
      
      return orderProductsByOrderId;
    } catch (error) {
      throw error;
    }
  }
  
  // * manually tested and working to update the quantity of the order product 
  async function updateOrderProductQuantity({ id, quantity }) {

    try {
  
      const { rows: [updatedOrderProduct] } = await client.query(
        `
          UPDATE order_products
          SET quantity=${ quantity }
          WHERE id=${ id }
          RETURNING *;
        `,
      );
        
        
    return updatedOrderProduct
    }catch(error){
      throw error;
    }
  
  }

  // * Working as a helper function to checkout order with function checkoutOrder
  async function updateOrderProductCheckoutPrice( id, checkoutPrice ) {

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
  
  // * manually tested and working to delete the product from the specific order
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
  // ? I don't think we need this one because a session user should also be able to edit the order and they should only see their
  // ? order when clicking on the cart so if they see it they have the ability to edit it
  async function canEditOrderProduct(orderProductId) {
  
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
        getOrderProductById,
        getOrderProductsByOrder,
        updateOrderProductQuantity,
        updateOrderProductCheckoutPrice,
        removeProductFromOrder,
        canEditOrderProduct,
    };