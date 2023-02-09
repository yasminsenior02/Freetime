const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Restrictions{
    static async listRestrictions(){
        const results = await db.query(
            `
            SELECT * 
            FROM RESTRICTION;
            `
        ); 
        return results.rows; 
    }

    static async listDiets(){
        const results = await db.query(
            `
            SELECT * 
            FROM RESTRICTION 
            WHERE type = 'diet';  
            `  
        );
        return results.rows;
    }

    static async listAllergies(){
        const results = await db.query(
            `
            SELECT * 
            FROM RESTRICTION 
            WHERE type = 'allergy'; 
            `
        );
        return results.rows;
    }

    static async postRestrictions(restriction){
        if (restriction.name.length === 0) {
            throw new BadRequestError("No restriction name provided");
        }
    
        if (restriction.type.length === 0) {
            throw new BadRequestError("No restriction type provided");
        }
        
        const result = await db.query(
        `
        INSERT INTO restriction(name, type)
        VALUES($1,$2)
        RETURNING name, type;  
        `,
        [restriction.name, restriction.type]);
        
        const results = result.rows[0];
        return results;
    }

    static async postUserRestrictions(restrictions, userId){
        console.log("restrictions in restriction model:",  restrictions)
        for(let i = 0; i < restrictions.length ; i++)
        {
            const result = await db.query(
            `
            INSERT INTO user_restriction(user_id, restriction_name)
            VALUES ($1,$2)
            RETURNING user_id, restriction_name
            `, [userId, restrictions[i]]
          )
        }
        // added this recently not sure if its needed 
        const results = result.rows[0];
        return results;
    }

    // static async listUserDiets(userRestrictions){
    //     const result = await db.query(
    //         `
    //         SELECT restriction_name
    //         FROM restriction
    //         WHERE type = $1 AND name = $2
    //         `,
    //         ['diet', ]
    //     )
    //     const results = result.rows.map((row) => row.restriction_name)
    //     return results;
    // }

    static async listUserRestrictions(userID){
        const result = await db.query(
            `
            SELECT restriction_name
            FROM user_restriction
            WHERE user_id = $1
            `,
            [userID]
        )
        const results = result.rows.map((row) => row.restriction_name)
        return results;
    }

    static async listUserRestrictionsObj(userId){
        console.log("user id in obj: " , userId)
        const result = await db.query(
            `SELECT * 
            FROM restriction, user_restriction
            WHERE user_restriction.user_id = $1 AND user_restriction.restriction_name = restriction.name;
            `, [userId]
        )
        const results = result.rows;
        return results;
    }
}

module.exports = Restrictions;

/*
 - query to fetch restriction ID where name = "vegan"
 - query to fetch all restaurant Ids from accomidation where restrictionID = result of first query 
*/