const express = require("express");
const Community = require("../models/community");
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    let { id } = res.locals.user;
    const community = await Community.listCommunity(id);
    return res.status(201).json({ community: community });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/schoolcommunities",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const user = await User.fetchUserByEmail(res.locals.user.email);
      let school_id = user.school_id;
      console.log("school Id in community router", school_id);
      const communities = await Community.listCommunitybySchool(school_id);
      return res.status(201).json({ communities: communities });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/usercommunities", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    let { id } = res.locals.user;
    const userCommunities = await Community.listCommsOfUser(id);
    return res.status(201).json({ userCommunities: userCommunities });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/communityid/:id",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    console.log("params", req.params); //
    try {
      const user = await User.fetchUserByEmail(res.locals.user.email);
      let commid = req.params.id;
      console.log("comm Id in community router", commid);
      const community = await Community.listCommbyId(commid);
      console.log("comm in route", community);
      return res.status(200).json({ community: community });
    } catch (err) {
      next(err);
    }
  }
);

/* put this in comm file apiClient.listUsersInComm(commId)*/

router.get(
  "/listusersincomm/:commId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const commId = res.params.commId; //!is this right?
      const usersInComm = await Community.listUsersInComm(commId);
      console.log("users in community: ", usersInComm);
      return res.status(201).json({ usersInComm: usersInComm });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/addusertocomm", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const commId = res.data.commId; //!is this right probs yes
    await Community.addUserToComm(res?.locals?.user?.id, commId) 
    // await Community.addUserToComm(10, 2) hard coded for testing 
    return res.status(201).json({ community: `User ${res?.locals?.user?.id} added community ${commId}` });
  }
  catch(err){
    next(err)
  }
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = await User.fetchUserByEmail(res.locals.user.email);
    console.log("user's school in community post request", user.school_id);
    let { id } = res.locals.user;
    let school_id = user.school_id;
    let commid = res.id;
    const community = req.body;
    const communities = await Community.PostCommunity(community, id, school_id);
    return res.status(201).json({ community: communities });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
