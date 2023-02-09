const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Restaurant {
  static async listRests(userId) {
    console.log("userId: ", userId);
    const results = await db.query(
      `SELECT *
      FROM restaurant
      `
    );
    return results.rows;
  }

  static async listRestaurantRestrictions(restaurantId) {
    const result = await db.query(
      `
      SELECT restriction_name
      FROM accommodation 
      WHERE restaurant_id = $1
      `,
      [restaurantId]
    );
    const results = result.rows.map((row) => row.restriction_name);
    console.log("results in model", results);
    return results;
  }

  static async listRestsByRestriction(userRestrictions) {
    console.log(userRestrictions);
    const result = await db.query(
      `
      SELECT restaurant.* , accommodation.restriction_name
      FROM restaurant
      INNER JOIN accommodation
      ON restaurant.id = accommodation.restaurant_id
      WHERE restriction_name = ANY ($1)
      `,
      [userRestrictions]
    );
    const results = result.rows;
    console.log("results in rest model: ", results);
    return results;
  }

  static async restaurantByAllRestrictions(userId) {
    const result = await db.query(
      `
      SELECT restaurantid FROM (SELECT COUNT (*) AS numMatches, r.id AS restaurantId
      FROM accommodation as a, restaurant as r, (SELECT restriction_name FROM user_restriction WHERE user_id = $1) AS sur
      WHERE r.id = a.restaurant_id AND a.restriction_name = sur.restriction_name GROUP BY r.id) AS nrm, (SELECT count (*)
            FROM user_restriction 
            WHERE user_id = $1) as sur
      WHERE nrm.numMatches = count;
      `,
      [userId]
    );
    const results = result.rows[0];
    return results;
  }

  static async listRestsbyId(user) {
    console.log("user: ", user);
    console.log("email :", user.email);
    const results = await db.query(
      `SELECT *
      FROM restaurant
      WHERE user_id = (select id from users where email = $1);`,
      [user.email]
    );
    return results.rows;
  }

  static async PostRests(restaurant, userId) {
    if (restaurant.name.length === 0) {
      throw new BadRequestError("No restaurant name provided");
    }

    if (restaurant.location.length === 0) {
      throw new BadRequestError("No restaurant location provided");
    }

    if (restaurant.image_url === 0) {
      throw new BadRequestError("Restaurant image cannot be zero");
    }
    if (restaurant.description.length === 0) {
      throw new BadRequestError("Restaurant description cannot be zero");
    }
    const result = await db.query(
      `
            INSERT INTO restaurant(
               name,
               location,
               latitude,
               longitude,
               image_url,
               description,
           user_id)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id, name,location,latitude,longitude,image_url, description, user_id;
            `,
      [
        restaurant.name,
        restaurant.location,
        restaurant.latitude,
        restaurant.longitude,
        restaurant.image,
        restaurant.description,
        userId,
      ]
    );
    const results = result.rows[0];
    return results;
  }

  static async listRestbyId(id) {
    const results = await db.query(
      `SELECT *
      FROM restaurant 
      WHERE id = $1;`,
      [id]
    ); // listing a single comm
    return results.rows ? results.rows[0] : null;
  }

  static async UpdateRests(restaurant, userId) {
    req.body = ` UPDATE restaurant
      SET column1 = value1, column2 = value2...., columnN = valueN
      WHERE [condition];`;
  }

  static async createRestaurant(user, restaurantForm) {
    // id          SERIAL PRIMARY KEY,
    // user_id     INTEGER,
    // name        TEXT NOT NULL,
    // location    INTEGER,
    // image_url   TEXT,
    // description TEXT NOT NULL,
    // FOREIGN KEY

    await db.query(
      `insert into restaurant (user_id, name, location, latitude, longitude, image_url, description)
      values ((select id from users where email = $1), $2, $3, $4, $5,$6, $7)`,
      [
        user.email,
        restaurantForm.name,
        restaurantForm.location,
        restaurantForm.latitude,
        restaurantForm.longitude,
        restaurantForm.image,
        restaurantForm.description,
      ]
    );
  }

  static async addAccommodation(restaurant, restrictions) {
    for (let i = 0; i < restrictions.length; i++) {
      const result = await db.query(
        `
        INSERT INTO Accommodation(restaurant_id, restriction_name)
        VALUES ($1,$2)
        RETURNING restaurant_id, restriction_name
        `,
        [restaurant.id, restrictions[i]]
      );
    }
  }
}

module.exports = Restaurant;
