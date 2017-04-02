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
SELECT count(*) FROM crime;

#Remember to create an index

DELIMITER //

CREATE PROCEDURE getAllLocData()
BEGIN
  SELECT longitude, latitude FROM crime
  WHERE NOT longitude = 0.0 AND
  NOT latitude = 0.0;
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
