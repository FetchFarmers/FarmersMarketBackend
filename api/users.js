const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils.js');

const { 
    //add database adapter functions
 } = require('../db')


















module.exports = usersRouter;



const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { requireUser, requireAdmin } = require('./middleware');
const { UserTakenError, UnauthorizedError } = require('../errors');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../db/users');

router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return next({
        name: 'UserNotFoundError',
        message: 'User not found',
      });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const user = await createUser({
      username,
      password,
      email,
      isAdmin: false,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.send({
      message: 'Thank you for registering!',
      token,
      user,
    });
  } catch (error) {
    if (error.code === '23505') {
      next({
        message: `User ${username} is already taken.`,
        name: UserTakenError(username),
        error: UserTakenError(username),
      });
    } else {
      next({
        message: error.message,
        name: error.name,
        error: 'Error',
      });
    }
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return next({
        name: 'UserNotFoundError',
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next({
        name: 'IncorrectPasswordError',
        message: 'Incorrect password',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.send({
      message: 'You are now logged in!',
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { username, password, email, isAdmin } = req.body;
  try {
    const user = await updateUser(id, {
      username,
      password,
      email,
      isAdmin,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
