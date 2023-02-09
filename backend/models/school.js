const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class School{
    static async listSchools(){
        const results = await db.query(
            `
            SELECT * 
            FROM SCHOOL;
            `
        ); 
        return results.rows; 
    }

    static async postSchools(school){
        if (school.name.length === 0) {
            throw new BadRequestError("No school name provided");
        }
    
        if (school.location.length === 0) {
            throw new BadRequestError("No school location provided");
        }
    
        if (school.image_url === 0) {
            throw new BadRequestError("No school image provided");
        }
        
        const result = await db.query(
        `
        INSERT INTO school(name, image, location)
        VALUES($1,$2,$3)
        RETURNING name, image, location;  
        `,
        [school.name, school.image, school.location]);
        
        const results = result.rows[0];
        return results;
    }

    static async addSchoolToUser(schoolId,userId){
        const result = await db.query(
            `
            UPDATE users
            SET school_id = $1
            WHERE id = $2 
            RETURNING id, email, username, school_id, type;
            `,
            [schoolId, userId]
        )
        const results = result.rows[0];
        console.log("school model test: " , schoolId, userId, results)
        return results;
    }
}

module.exports = School;