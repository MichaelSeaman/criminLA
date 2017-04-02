CREATE TABLE IF NOT EXISTS crime(
  rpt_id INT UNSIGNED PRIMARY KEY NOT NULL,
  arst_date DATETIME,
  area INT UNSIGNED,
  area_desc VARCHAR(20),
  age INT UNSIGNED,
  sex CHAR,
  charge VARCHAR(20),
  charge_desc VARCHAR(50),
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6)
);


DELIMITER $$
CREATE PROCEDURE getAllLocData()
BEGIN
  SELECT longitude, latitude FROM crime
  WHERE NOT longitude = 0.0 AND
  NOT latitude = 0.0;
END $$
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS `getAllRecordsInArea` //
CREATE PROCEDURE getAllRecordsInArea(in_latitude DECIMAL(10,6), in_longitude DECIMAL(10,6), radius DECIMAL(6,2))
BEGIN
   SELECT * FROM crime WHERE get_distance_in_miles_between_geo_locations(in_latitude, in_longitude, latitude, longitude) < radius;
END //
DELIMITER ;


DELIMITER $$
DROP FUNCTION IF EXISTS `get_distance_in_miles_between_geo_locations` $$
CREATE FUNCTION get_distance_in_miles_between_geo_locations(geo1_latitude decimal(10,6), geo1_longitude decimal(10,6), geo2_latitude decimal(10,6), geo2_longitude decimal(10,6))
returns decimal(10,3) DETERMINISTIC
BEGIN
  return ((ACOS(SIN(geo1_latitude * PI() / 180) * SIN(geo2_latitude * PI() / 180) + COS(geo1_latitude * PI() / 180) * COS(geo2_latitude * PI() / 180) * COS((geo1_longitude - geo2_longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515);
END $$
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getLocalTimeData(in_latitude DECIMAL(10,6), in_longitude DECIMAL(10,6), radius DECIMAL(6,2))
BEGIN
  SELECT COUNT(rpt_id) AS total, CONCAT( DATE(arst_date), ' - ', DATE(arst_date) + INTERVAL 6 DAY) AS week
  FROM crime WHERE get_distance_in_miles_between_geo_locations(in_latitude, in_longitude, latitude, longitude) < radius
  GROUP BY WEEK(arst_date)
  ORDER BY WEEK(arst_date);
END //
DELIMITER ;

