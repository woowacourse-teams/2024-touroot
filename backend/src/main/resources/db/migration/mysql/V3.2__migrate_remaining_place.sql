-- 남은 모든 Place 데이터 이동
UPDATE travelogue_place tp
    JOIN place p ON tp.place_id = p.id
    SET tp.latitude = p.latitude, tp.longitude = p.longitude, tp.name = p.name;

UPDATE travel_plan_place tpp
    JOIN place p ON tpp.place_id = p.id
    SET tpp.latitude = p.latitude, tpp.longitude = p.longitude, tpp.name = p.name;
