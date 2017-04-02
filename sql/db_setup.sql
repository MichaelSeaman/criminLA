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
SELECT * FROM crime;