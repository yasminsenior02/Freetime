const bcrypt = require("bcrypt")
const db = require("../db")
const tokens = require("../utils/tokens")
const { BCRYPT_WORK_FACTOR } = require("../config")

const createUsers = async () => {
    await db.query(`
    INSERT INTO users (email, password, username, school_id, type)
    VALUES (
      'user1@user1.com',
      '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
      'user1',
      '1',
      'student'
    ), (
      'user2@user2.com',
      '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
      'user2',
      '1',
      'restaurant owner' 
    );
  `);

  const results = await db.query(`SELECT id FROM users ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

const user1 = tokens.createUserJwt({ username: "user1", isAdmin: false })
const user2 = tokens.createUserJwt({ username: "user2", isAdmin: false })

module.exports = {
  createUsers,
  user1,
  user2,
}