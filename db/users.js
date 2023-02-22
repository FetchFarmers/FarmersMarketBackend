// grab our db client connection to use with our adapters
const client = require('../client');

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
      SELECT * FROM users;
    `);
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const { rows: user } = await client.query(`
      SELECT * FROM users
      WHERE id=$1;
    `, [id]);
    return user[0];
  } catch (error) {
    throw error;
  }
}

async function createUser(userData) {
  const { username, password, email, isAdmin } = userData;
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users(username, password, email, "isAdmin")
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [username, password, email, isAdmin]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, updates) {
  const setString = Object.keys(updates).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  const values = Object.values(updates);
  values.push(id);
  try {
    const { rows: [user] } = await client.query(`
      UPDATE users
      SET ${setString}
      WHERE id=$${values.length}
      RETURNING *;
    `, values);
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    await client.query(`
      DELETE FROM users
      WHERE id=$1;
    `, [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
