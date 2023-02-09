const express = require("express");
const Restriction = require("../models/restriction")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
    const restrictions = await Restriction.listRestrictions()
    return res.status(201).json({ restrictions: restrictions});
    } catch (err) {
    next(err);
  }
})

router.get("/diets", async (req, res, next) => {
    try{
        console.log("gets to restrictions/diest endpoint")
    const diets = await Restriction.listDiets()
    return res.status(201).json({ diets: diets});
    } catch (err) {
    next(err);
  }
})

router.get("/allergies", async (req, res, next) => {
    try{
    const allergies = await Restriction.listAllergies()
    return res.status(201).json({ allergies: allergies});
    } catch (err) {
    next(err);
  }
})

router.get("/user", async (req,res,next) => {
  try{
    const userRestrictions = await Restriction.listUserRestrictions(res?.locals?.user?.id)
    return res.status(201).json({ restrictions: userRestrictions});
  }catch(err){
    next(err)
  }
})

router.post("/user", async (req,res,next) => {
  try{
    const userRestrictions = req.body;
    console.log("user restrictions in restriction model", userRestrictions)
    const restrictions = await Restriction.postUserRestrictions(userRestrictions, res?.locals?.user?.id) 
    return res.status(201).json({ restrictions: restrictions});
  }catch(err){
    next(err)
  }
})

router.post("/", async (req, res, next) => {
    try{
        const restriction = req.body 
        const restrictions = await Restriction.postRestrictions(restriction)
        return res.status(201).json({ restrictions: restrictions });
    } catch (err){
        next(err);
    }
})


module.exports = router