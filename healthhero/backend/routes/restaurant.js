const express = require("express");
const Restaurant = require("../models/restaurant");
const Restriction = require("../models/restriction");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.use((req, res, next) => {
  console.log("req query: ", req.query.restaurantid);
  next();
});

router.use((req, res, next) => {
  console.log("req query: ", req.body);
  next();
});

router.post(
  "/create",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const restaurantForm = req.body;
      const user = res.locals.user;

      console.log("rest form restrictions", restaurantForm.restrictions);
      const restaurant = await Restaurant.createRestaurant(
        user,
        restaurantForm
      );

      res.status(201).json({ status: restaurant });
    } catch (error) {
      next(error);
    }
  }
);

//end point to get restaurant restrictions array for a single restaurant
router.get(
  "/restrictionsbyrest",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const restrictions = await Restaurant.listRestaurantRestrictions(
        req.query.restaurantid
      );
      console.log("req.query.restaurantid: ", req.query.id);
      console.log("restrictions in backend: ", restrictions);
      return res.status(201).json({ restrictions: restrictions });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    let { id } = res.locals.user;
    console.log("res locals: ", res.locals.user);
    const restaurant = await Restaurant.listRests(id);
    return res.status(201).json({ restaurants: restaurant });
  } catch (err) {
    next(err);
  }
});

router.get("/minrestriction", async (req, res, next) => {
  //change endpoint name later
  try {
    const userRestrictions = await Restriction.listUserRestrictions(
      res?.locals?.user?.id
    ); //array with user restriction names
    console.log("user Restrictions: ", userRestrictions);
    const restaurants = await Restaurant.listRestsByRestriction(userRestrictions);
    let restautantList = {};
    for (let restaurant of restaurants) {
      if (!restautantList[restaurant.id]) {
        restautantList[restaurant.id] = restaurant;
        restautantList[restaurant.id].restriction_name = [
          restautantList[restaurant.id].restriction_name,
        ];
      } else {
        restautantList[restaurant.id].restriction_name.push(
          restaurant.restriction_name
        );
      }
    }
    console.log("restaurant list in router: ", restautantList); //something weird is happeing b/c the changes we made to query some columns may not be available
    restautantList = Object.values(restautantList);
    return res.status(201).json({ restaurants: restautantList });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/restaurant",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      // let { id } = res.locals.user;
      // console.log("res locals: " , res.locals.user)
      const user = res.locals.user;
      const restaurant = await Restaurant.listRestsbyId(user);
      return res.status(201).json({ restaurants: restaurant });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/restaurantid/:id",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    console.log(req.params); //
    try {
      // let {id} = req.params
      // const user = await User.fetchUserByEmail(res.locals.user.email);
      let restid = req.params.id;
      console.log("rest Id in community router", restid);
      const restaurant = await Restaurant.listRestbyId(restid);
      console.log("rest in route", restaurant);
      return res.status(200).json({ restaurant: restaurant });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    let { id } = res.locals.user;
    console.log("id in restaurant route", id);
    const IncomingRestaurant = req.body;
    const OutgoingRestaurant = await Restaurant.PostRests(
      IncomingRestaurant,
      id
    );
    console.log("restaurant restrictions", IncomingRestaurant.restrictions);
    console.log("restaurant id using restaurant.id: ", OutgoingRestaurant.id);
    const restrictions = await Restaurant.addAccommodation(
      OutgoingRestaurant,
      IncomingRestaurant.restrictions
    );
    console.log("restaurant posted in router: ", restaurant);
    return res.status(201).json({ restaurant: OutgoingRestaurant });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/allrestrictions",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      restaurantList = await Restaurant.restaurantByAllRestrictions(
        res?.locals?.user?.id
      );
      return res.status(201).json({ restaurantList: restaurantList });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/restaurant/:id",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      let { id } = res.locals.user;
      const restaurant = req.body;
      const restaurants = await Restaurant.PostRests(restaurant, id);
      return res.status(201).json({ restaurant: restaurants });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
