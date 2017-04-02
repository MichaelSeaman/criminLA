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
   SELECT * FROM crime WHERE
     latitude > (in_latitude - radius / 69) AND
    latitude < (in_latitude + radius / 69) AND
  longitude > (in_longitude - radius / 69) AND
  longitude < (in_longitude + radius / 69);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getLocalTimeData(in_latitude DECIMAL(10,6), in_longitude DECIMAL(10,6), radius DECIMAL(6,2))
BEGIN
  SELECT COUNT(rpt_id) AS total, CONCAT( DATE(arst_date), ' - ', DATE(arst_date) + INTERVAL 6 DAY) AS week
  FROM crime
  GROUP BY WEEK(arst_date)
  ORDER BY WEEK(arst_date);
END //
DELIMITER ;

CALL getLocalTimeData(34.052235, -118.243683, 50.0);
SELECT get_distance_in_miles_between_geo_locations(34.052235, 34.052235, -118.243683, -118.243682 );