const express = require("express");
const School = require("../models/school");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const schools = await School.listSchools();
    console.log("schools in model", schools);
    return res.status(201).json({ schools: schools });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/schoolidfromname",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const schoolName = req.query.schoolName;
      console.log("school name in router: ", schoolName);
      const schoolId = await School.getSchoolIdByName(schoolName);
      console.log("schoolID in route: ", schoolId);
      return res.status(201).json({ schoolId: schoolId });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const school = req.body;
    const schools = await School.postSchools(school);
    return res.status(201).json({ school: schools });
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/userschool",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      console.log("req.body in school route", req.body);
      const { schoolId } = req.body;
      console.log("school id in school route", schoolId);
      const response = await School.addSchoolToUser(
        schoolId,
        res?.locals?.user?.id
      );
      return res.status(201).json({ school: response });
    } catch (err) {
      next(err);
    }

    //check to see if a user already has
  }
);

module.exports = router;
