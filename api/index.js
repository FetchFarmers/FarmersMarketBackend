const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET, STRIPE_SECRET_KEY } = process.env;


router.get('/farm', async (req, res, next) => {
    res.send ({message: "Welcome to the site to fetch_farmers"})
    next;
});

const stripe = require("stripe")(STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

 
// This will run before all of the routers and get the user if token is received. It will store the user as req.user
router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
// const admin = req.header ('isAdmin')
    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/create-payment-intent", async (req, res) => {
  const { checkoutPrice } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: checkoutPrice,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});


// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
router.use('/products', productsRouter);

// ROUTER: /api/orders
const ordersRouter = require('./orders');
router.use('/orders', ordersRouter);

// ROUTER: /api/reviews
const reviewsRouter = require('./reviews');
router.use('/reviews', reviewsRouter);

// This will run if no matching route was found
router.use('*', (req, res, next) => {
  const err = new Error("Not found")
  err.status = 404
  res.status(404)
  next({
    name: "404 Error",
    error: "404",
    message: "Error 404 - Page not found"
  })
});

// This will run last and send any error messages passed in from next
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.send({
    name: err.name,
    error: err.error,
    message: err.message
  });
});

module.exports = router;

