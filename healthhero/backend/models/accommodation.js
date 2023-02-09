const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Accommodation{

    static async postAccommodation(accommodation){ //check accomodation logic 
        const result = await db.query(
            `
            INSERT INTO accommodation(restaurant_id, restriction_id)
            VALUES($1,$2)
            RETURNING restaurant_id, restriction_id;  
            `,
            [accommodation.restaurant_id, accommodation.restriction_id]);
            const results = result.rows[0];
            return results;
    }

}