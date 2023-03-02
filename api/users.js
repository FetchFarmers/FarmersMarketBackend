const express = require("express");
const jwt = require("jsonwebtoken");
const { requireUser, requireAdmin} = require("./utils.js");
const { getUserByUsername, createUser, getUser, 
  getAllUsers,  getUserById, deleteUser, updateUser} = require("../db");

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email, isAdmin } = req.body;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        message: `User ${username} is already taken.`,
        name: UserTakenError(username),
        error: UserTakenError(username),
      });
    }

    if (password.length < 8) {
      next({
        message: "Password Too Short!",
        name: PasswordTooShortError(),
        error: PasswordTooShortError(),
      });
    }

    const user = await createUser({
      username,
      password,
      email,
      isAdmin,
    });

    const token = jwt.sign(user, process.env.JWT_SECRET);
    console.log(token);
    res.send({
      message: "Thank you for registering.",
      token,
      user: user,
    });
  } catch (error) {
    next({
      message: error.message,
      name: error.name,
      error: "Error",
    });
  }
});


// usersRouter.post("/register", async (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     const _user = await getUserByUsername(username);

//     if (_user) {
//       next({
//         message: `User ${username} is already taken.`,
//         name: UserTakenError(username),
//         error: UserTakenError(username),
//       });
//     }

//     if (password.length < 8) {
//       next({
//         message: "Password Too Short!",
//         name: PasswordTooShortError(),
//         error: PasswordTooShortError(),
//       });
//     }

//     const user = await createUser({
//       username,
//       password,
//     });

//     const token = jwt.sign(user, process.env.JWT_SECRET);
//     console.log(token);
//     res.send({
//       message: "Thank you for registering.",
//       token,
//       user: user,
//     });
//   } catch (error) {
//     next({
//       message: error.message,
//       name: error.name,
//       error: "Error",
//     });
//   }
// });

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password)
  if (!username || !password) {
    return next({
      name: "MissingUsernameOrPasswordError",
      message: "You must enter a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    if (!user) {
      return next({
        name: "IncorrectUsernameOrPasswordError",
        message: "Username or password is incorrect",
      });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.send({ message: "you're logged in!", token, user });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /api/users/me
usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user);
    }
  } catch (err) {
    console.log(err.message);
    next({
      error: UnauthorizedError(),
      name: UnauthorizedError(),
      message: "You must be logged in to perform this action",
    });
  }
});




usersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});



usersRouter.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});




usersRouter.put('/me', requireUser, async (req, res, next) => {
  try {
    const updatedUser = await updateUser(req.user.id, req.body);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});


module.exports = usersRouter;

