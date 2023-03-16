const client = require("./client");
const bcrypt = require("bcrypt")

//tested and passed
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username
      FROM users
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//tested and passed
async function createUser({ username, password, email, isAdmin }) {

  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  let userToAdd = { username, hashedPassword, email, isAdmin };
  
  if (!userToAdd.isAdmin){
    userToAdd.isAdmin = false
  }
console.log("user", userToAdd)
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, email, "isAdmin") 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, email, "isAdmin";
    `,
      [userToAdd.username, userToAdd.hashedPassword, userToAdd.email, userToAdd.isAdmin]
    );
    return user;
  } catch (error) {
    if (
      error.message.toLowerCase().includes("unique") ||
      error.message.toLowerCase().includes("constraint") ||
      error.message.toLowerCase().includes("failed")
    ) {
      throw new Error("Username already exists");
    }
    console.error(error);
    throw error;
  }
}

//passed test and incorporated Katherine's comments
async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    
    const hashedPassword = user.password;
    let passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else if (!passwordsMatch) {
      throw new Error('Passwords do not match');
    }
  } catch (error) {
    console.error(error);
  }
}


 
async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(
      `
      SELECT id, username, "isAdmin", email
      FROM users
      WHERE id=$1
    `,
      [userId]
    );
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );
    console.log(user)
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//this function passed the test
async function updateUser(id, updates) {
  const setString = Object.keys(updates)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  const values = Object.values(updates);
  values.push(id);
  try {
    const { rows: [user] } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=$${values.length}
      RETURNING *;
    `,
      values
    );
    delete user.password
    return user;
  } catch (error) {
    throw error;
  }
}

// async function deleteUser(id) {
//   try {
//     await client.query(
//       `
//       DELETE FROM users
//       WHERE id=$1;
//     `,
//       [id]
//     );
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  updateUser,
  getUserById,
  getAllUsers,

};
