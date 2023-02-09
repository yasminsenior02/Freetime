const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")
const User = require("./user")
const { createUsers, user1, user2 } = require("./createUsers")
const db = require("../db.js")

describe("User", () => {
    describe("Test register", () => {
        const newUser = {
            email: "test@test.io",
            username: "test",
            school_id: 1,
            type: "student",
        }

        test("User can successfully register with proper credentials", async () => {
            const user = await User.register({ ...newUser, password: "pw" })
            expect(user).toEqual({
            id: expect.any(Number),
            email: newUser.email,
            username: newUser.username,
            school_id: newUser.school_id,
            type: newUser.type
            })
        })
    })

    describe("Test fetchUserByEmail", () => {
        test("Can fetch a user by email", async () => {
          const user = await User.fetchUserByEmail("user1@user1.com")
          expect(user).toEqual({
            id: expect.any(Number),
            password: expect.any(String),
            email: "user1@user1.com",
            school_id: 1,
            type: "student"
          })
        })
    
        test("Unknown email returns nothing", async () => {
          const user = await User.fetchUserByEmail("wrong@nope.nope")
          expect(user).toBeFalsy()
        })
    })
})
