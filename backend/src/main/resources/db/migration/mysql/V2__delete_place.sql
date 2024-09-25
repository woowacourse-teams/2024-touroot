ALTER TABLE travelogue_place
    ADD latitude VARCHAR(255),
    ADD longitude VARCHAR(255),
    ADD name VARCHAR(255);

ALTER TABLE travel_plan_place
    ADD latitude VARCHAR(255),
    ADD longitude VARCHAR(255),
    ADD name VARCHAR(255);

ALTER TABLE travelogue_place
    ALTER COLUMN latitude SET NOT NULL,
    ALTER COLUMN longitude SET NOT NULL,
    ALTER COLUMN name SET NOT NULL;

ALTER TABLE travel_plan_place
    ALTER COLUMN latitude SET NOT NULL,
    ALTER COLUMN longitude SET NOT NULL,
    ALTER COLUMN name SET NOT NULL;

UPDATE travelogue_place tp
    JOIN place p ON tp.place_id = p.id
    SET tp.latitude = p.latitude, tp.longitude = p.longitude, tp.name = p.name;

UPDATE travel_plan_place tpp
    JOIN place p ON tpp.place_id = p.id
    SET tpp.latitude = p.latitude, tpp.longitude = p.longitude, tpp.name = p.name;

ALTER TABLE travelogue_place
DROP FOREIGN KEY FKn2xqfhj4f7s6iu606cuibyuyi;

ALTER TABLE travel_plan_place
DROP FOREIGN KEY FK1duxocxq04ss8erjbcgfe0nfs;

DROP TABLE place;
