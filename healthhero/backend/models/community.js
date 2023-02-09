const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Community {
  static async listCommunity(userId) {
    const results = await db.query(
      `SELECT *
      FROM community 
      WHERE user_id = $1;`,
      [userId]
    );
    return results.rows;
  }

  static async listCommunitybySchool(schoolId) {
    const results = await db.query(
      `SELECT *
      FROM community 
      WHERE school_id = $1;`,
      [schoolId]
    );
    return results.rows;
  }
  static async listCommbyId(id) {
    const results = await db.query(
      `SELECT *
      FROM community 
      WHERE id = $1;`,
      [id]
    ); // listing a single comm
    return results.rows ? results.rows[0] : null;
  }

  static async PostCommunity(community, userId, school_id) {
    console.log(userId);
    if (community.name.length === 0) {
      throw new BadRequestError("No community name provided");
    }

    if (community.image === 0) {
      throw new BadRequestError("No community image provdid");
    }
    if (community.description.length === 0) {
      throw new BadRequestError("Comunnity description cannot be zero");
    }
    const result = await db.query(
      `
            INSERT INTO community(
               name,
               image_url,
               description,
               user_id,
               school_id
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING id, name,image_url, description, user_id, school_id;
            `,
      [
        community.name,
        community.image,
        community.description,
        userId,
        school_id,
      ]
    );
    const results = result.rows[0];
    return results;
  }

  static async addUserToComm(userId, commId) {
    const result = await db.query(
      `
      INSERT INTO user_community(user_id, community_id)
      VALUES ($1,$2)
      RETURNING user_id, community_id;
      `,
      [userId, commId]
    );
    const results = result.rows[0];
    return results;
  }

  static async listUsersInComm(commId) {
    const result = await db.query(
      `
      SELECT username 
            FROM users, user_community
            WHERE user_community.community_id = $1 AND users.id = user_community.user_id;`,
      [commId]
    );
    const results = result.rows;
    return results;
  }

  static async listCommsOfUser(userId) {
    //lists all communities a user is apart of
    const result = await db.query(
      `SELECT *
      FROM community, user_community
      WHERE user_community.user_id = $1 AND user_community.community_id = community.id;`,
      [userId]
    );
    console.log("result.rows", result.rows);
    const results = result.rows[0];
    return results;
  }
}

module.exports = Community;
