const client = require('./client');

async function addProductToOrder({ userId, productId, quantity}) {
  
    try {
      
      const {
        rows: [createdOrderProduct] } = await client.query(
        `
          INSERT INTO orders("userId", "productId", quantity) 
          VALUES($1, $2, $3) 
          RETURNING *;
        `,
        [userId, productId, quantity]
      );
  
      return await createdOrderProduct;
    } catch (error) {
      throw error;
    }
}
  
async function getOrderProductById(id) {
  
    try {
      const { rows: [orderProduct] } = await client.query(
        `
          SELECT *
          FROM orders
          WHERE id=${id};
        `
      );
      
      return orderProduct;
    } catch (error) {
      throw error;
    }
  
}
  
async function getOpenOrderByUserId({ id }) {
    try {
      const { rows: openOrderByUserId } = await client.query(
        `
          SELECT *
          FROM orders
          WHERE "userId"=${id} AND "isCheckedOut"=false;
        `
      );
      
      return openOrderByUserId;
    } catch (error) {
      throw error;
    }
}
  
async function updateOrderProductQuantity({ id, quantity }) {
  
    try {
  
        await client.query(
        `
          UPDATE orders
          SET quantity=${ quantity }
          WHERE id=${ id }
          RETURNING *;
        `
        );
      
        
    return await getOrderProductById(id)
    }catch(error){
      throw error;
    }
  
}
  

async function destroyOrderProduct(id) {
  
    try {
      
      const { rows: [ deletedOrderProduct ] } = await client.query(
        `
          DELETE FROM orders
          WHERE id=${id}
          RETURNING *;
        `
      ) 
  
      return deletedOrderProduct;
    }catch(error) {
      throw error;
    }
  
}


module.exports = {
    addProductToOrder,
    getOrderProductById,
    getOpenOrderByUserId,
    updateOrderProductQuantity,
    destroyOrderProduct
};