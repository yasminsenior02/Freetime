\c healthhero
-- SELECT r.name, a.restriction_name, r.id, a.restaurant_id
--       FROM restaurant AS r, accommodation AS a
--       WHERE r.id = a.restaurant_id
--       Limit 15;
      -- INNER JOIN accommodation;
      -- ON restaurant.id = accommodation.restaurant_id;
      -- WHERE restriction_name in ('vegan', 'halal' , 'kosher');

-- SELECT * 
--       FROM restaurant
--       INNER JOIN accommodation
--       ON restaurant.id = accommodation.restaurant_id
--       WHERE restriction_name in ('Vegan', 'Halal' , 'Kosher');

-- SELECT COUNT(*) FROM (SELECT restriction_name
--             FROM user_restriction
--             WHERE user_id = 2) AS sur;

-- SELECT restaurantid FROM (SELECT COUNT (*) AS numMatches, r.id AS restaurantId
--   FROM accommodation as a, restaurant as r, (SELECT restriction_name FROM user_restriction WHERE user_id = 2) AS sur
--   WHERE r.id = a.restaurant_id AND a.restriction_name = sur.restriction_name GROUP BY r.id) AS nrm, (SELECT count (*)
--             FROM user_restriction 
--             WHERE user_id = 2) as sur
--   WHERE nrm.numMatches = count;

SELECT restriction_name
      FROM accommodation 
      WHERE restaurant_id = 11;