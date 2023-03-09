const express = require('express');
const { requireUser } = require('./utils');
const ordersRouter = express.Router();

const { 
  getOpenOrdersByUserInfo,
  getAllClosedOrders,
  getAllOpenOrders,
  getClosedOrdersByUser,
  getAllOrdersByProduct,
  checkoutOrder,
  destroyOrder,
  addProductToOrder,
} = require('../db/orders');

const { 
  updateOrderProductQuantity,
  removeProductFromOrder,
} = require('../db/order_products');

// * GET api/orders/closed - to get all closed orders (for admin)
ordersRouter.get("/closed", async (req, res, next) => {

    try{

        const allClosedOrders = await getAllClosedOrders(); 
        res.send(allClosedOrders)

    } catch(error) {
        next(error);
    }

});

// * GET api/orders/open - to get all open orders(for admin)
ordersRouter.get("/open", async (req, res, next) => {

    try{

        const allOpenOrders = await getAllOpenOrders();
        res.send(allOpenOrders);

    } catch(error) {
        next(error);
    }

});

// * P api/orders/user/open - to get open order for user
// ? working without user but only tested for passed in user by hard coding in the user data so not sure if it fully works
ordersRouter.post("/user/open", async (req, res, next) => {

    if (req.user) {
        req.body.userId = req.user.id
    }

    try{

        const openUserOrder = await getOpenOrdersByUserInfo(req.body)
        res.send(openUserOrder)

    } catch(error) {
        next(error);
    }

})

// * GET api/orders/user/order_history - to get closed orders for user
// ? I have only tested this with hard coding in the req.user so I am not sure if if fully works
ordersRouter.get("/user/order_history", requireUser, async (req, res, next) => {

    try{

        const closedUserOrders = await getClosedOrdersByUser(req.user.id)
        console.log("🚀 ~ file: orders.js:87 ~ ordersRouter.get ~ closedUserOrders:", closedUserOrders)
        
        res.send(closedUserOrders)

    } catch(error) {
        next(error);
    }

}) 

// * GET api/orders/:productId - to get all orders with specific product (for admin)
ordersRouter.get("/:productId", async (req, res, next) => {
    const { productId } = req.params;

    try{
        
        const ordersWithProduct = await getAllOrdersByProduct(productId)
        res.send(ordersWithProduct)

    } catch(error) {
        next(error);
    }

})

// * POST api/orders/user/open/add_product - to add product to client order 
// ? working without user but only tested for passed in user by hard coding in the user data so not sure if it fully works
ordersRouter.post("/user/open/add_product", async (req, res, next) => {

    if (req.user) {
        req.body.userId = req.user.id
    }
    
    try{

        const orderWithAddedProduct = await addProductToOrder(req.body)
        res.send(orderWithAddedProduct)

    } catch(error) {
        next(error);
    }

}) 

// * PATCH api/orders/user/open/:orderId - to checkout open order 
ordersRouter.patch("/user/open/:orderId", async (req, res, next) => {
    const { orderId } = req.params;
    req.body.id = orderId;

    try{
        
        const checkedOutOrder = await checkoutOrder(req.body)
        res.send(checkedOutOrder)


    } catch(error) {
        next(error);
    }

})

// * PATCH api/orders/user/open/order_products/:orderProductId - to update quantity of order product
ordersRouter.patch("/user/open/order_products/:orderProductId", async (req, res, next) => {
    const { orderProductId } = req.params;
    req.body.id = orderProductId;
    
    try{
            
        const orderWithUpdatedProductQuantity = await updateOrderProductQuantity(req.body)
        res.send(orderWithUpdatedProductQuantity)
    
    
    } catch(error) {
        next(error);
    }

})

// * DELETE api/orders/user/open/:orderId - to destroy entire open order 
ordersRouter.delete("/user/open/:orderId", async (req, res, next) => {
    const { orderId } = req.params;

    try{

        const deletedOrder = await destroyOrder(orderId)
        res.send(deletedOrder)

    } catch(error) {
        next(error);
    }

})

// * DELETE api/orders/user/open/order_products/:orderProductId - to remove product from order
ordersRouter.delete("/user/open/order_products/:orderProductId", async (req, res, next) => {
    const { orderProductId } = req.params;

    try{

        const orderWithoutProduct = await removeProductFromOrder(orderProductId)
        res.send(orderWithoutProduct)

    } catch(error) {
        next(error);
    }

})


module.exports = ordersRouter;